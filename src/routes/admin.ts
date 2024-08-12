import { Router } from "express";
import * as auth from "../controllers/auth";
import * as events from "../controllers/events";
import * as groups from "../controllers/groups";
import * as people from "../controllers/people";

const router = Router();

router.post("/login", auth.login);

router.get("/ping", auth.validateMiddleware, (req, res) => { res.json({ pong: true, admin: true }) });

router.get("/events", auth.validateMiddleware, events.getAll);
router.get("/events/:id", auth.validateMiddleware, events.getEvent);
router.post("/events", auth.validateMiddleware, events.addEvent);
router.put("/events/:id", auth.validateMiddleware, events.updateEvent);
router.delete("/events/:id", auth.validateMiddleware, events.deleteEvent);


router.get("/events/:id_event/groups", auth.validateMiddleware, groups.getAll);
router.get("/events/:id_event/groups/:id", auth.validateMiddleware, groups.getGroup);
router.post("/events/:id_event/groups", auth.validateMiddleware, groups.addGroup)
router.put("/events/:id_event/groups/:id", auth.validateMiddleware, groups.updateGroup);
router.delete("/events/:id_event/groups/:id", auth.validateMiddleware, groups.removeGroup);

router.get("/events/:id_event/groups/:id_group/people", auth.validateMiddleware, people.getAll);
router.get("/events/:id_event/groups/:id_group/people/:id", auth.validateMiddleware, people.getPerson);
router.post("/events/:id_event/groups/:id_group/people", auth.validateMiddleware, people.addPerson);
router.put("/events/:id_event/groups/:id_group/people/:id", auth.validateMiddleware, people.updatePerson);
router.delete("/events/:id_event/groups/:id_group/people/:id", auth.validateMiddleware, people.deletePerson);

export default router;