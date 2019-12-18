const express = require('express')
const WaitTimeController = require('../controllers/wait-times')
const router = express.Router()

router.get("", WaitTimeController.getWaitTimes)

module.exports = router;