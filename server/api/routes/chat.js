const express = require("express");
const path = require("path");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const db = require("../../db");
const { log } = require("console");

let clients = [];

router.get("/room", auth, (req, res) => {
  const userId = req.user.id;
  db.all("SELECT room_id FROM chat_room_members WHERE user_id = ?", [userId], (err, roomIds) => {
    if (err) return res.status(500).json({ message: "get /chat/room: DB 오류" });
    res.json(roomIds);
  });
});

router.get("/other/:id", auth, (req, res) => {
  const userId = req.user.id;
  const roomId = req.params.id;
  const sql = `
    SELECT u.username, u.image
    FROM chat_room_members m
    JOIN users u ON m.user_id = u.id
    WHERE m.room_id = ?
      AND m.user_id != ?
    LIMIT 1;
  `;
  db.get(sql, [roomId, userId], (err, other) => {
    if (err) return res.status(500).json({ message: "DB 오류" });

    if (!other) {
      return res.status(404).json({ message: "상대방이 없습니다." });
    }

    res.json(other);
  });
});


/**chat_rooms 생성
 * 1) 두 유저가 들어있는 방 찾기
 * 2) 없으면 방 새로 만들기
 * 3) 두 유저 room_member에 추가
 * 4) res에 roomId 추가
 */
router.post("/room", (req, res) => {
  const { myId, otherId } = req.body;

  if (myId === otherId) return res.json({message: "fail to create chat. same ID"});

  try {
    const room = db.get(`
      SELECT crm1.room_id as roomId
      FROM chat_room_members crm1
      JOIN chat_room_members crm2
        ON crm1.room_id = crm2.room_id
      WHERE crm1.user_id = ?
        AND crm2.user_id = ?`, [myId, otherId]);

    if (room && room.roomId) {
      console.log("test")
      return res.json({ roomId: room.roomId });
    }

    const result = db.run(`
      INSERT INTO chat_rooms (created_at)
      VALUES (?)`, [Date.now()], function(err) {
        if (err) {
          console.error(err.message);
        } else {
          db.run(`INSERT INTO chat_room_members (room_id, user_id, joined_at) VALUES (?, ?, ?)`, [this.lastID, myId, Date.now()]);
          db.run(`INSERT INTO chat_room_members (room_id, user_id, joined_at) VALUES (?, ?, ?)`, [this.lastID, otherId, Date.now()]);
          res.json({ roomId: this.lastID });
        }
      });

  } catch (error) {
    console.error("채팅방 생성 중 오류 발생:", error);
    res.status(500).json({ error: "Failed to create chat room" });
  }
});

router.get("/stream/:roomId", (req, res) => {
  const roomId = req.params.roomId;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders();

  const client = { id: Date.now(), roomId, res };
  clients.push(client);

  //console.log("SSE 연결:", client.id);

  req.on("close", () => {
    clients = clients.filter(c => c.id !== client.id);
    //console.log("SSE 종료:", client.id);
  });
});

//@Get all message data
router.get("/message/:roomId", (req, res) => {
  const roomId = req.params.roomId;

  db.all(`SELECT id, sender_id, content, created_at FROM messages WHERE room_id = ?`, [roomId], (err, result) => {
    if (err) return res.status(500).json({ message: "DB 오류" });
    return res.json(result);
  });
});

//@Post a message
router.post("/message", auth, (req, res) => {
  const { roomId, content } = req.body;
  const senderId = req.user.id;

  db.run(
    `INSERT INTO messages (room_id, sender_id, content, created_at)
     VALUES (?, ?, ?, ?)`,
    [roomId, senderId, content, Date.now()],
    function (err) {
      if (err) return res.status(500).json({ error: err });

      const newMessage = {
        id: this.lastID,
        room_id: roomId,
        sender_id: senderId,
        content,
        created_at: Date.now(),
      };

      //SSE 브로드캐스트
      clients
        .filter(c => c.roomId == roomId)
        .forEach(c => {
          c.res.write(`data: ${JSON.stringify(newMessage)}\n\n`);
        });

      res.json({ message: "success", id: this.lastID });
    }
  );
});

module.exports = router;