const router = require('express').Router();
const {Verify} = require('./varifyToken')

router.get('/',Verify, (req, res) => {
    res.json({title: "my first post",
     description: "random data you should not access"
    })
})


module.exports = router;