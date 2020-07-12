/* express router : express 의 라우터 기능(뷰와 모델 연결 == http://localhost:5000/api/items) */
const express = require('express');
const router = express.Router();

/* model */
const Item = require('../../model/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (request, response) => {
    Item.find()
        .sort({ date: -1 }) // 최신순 정렬: 날짜는 나중에 등록된 게 더 크기 때문. 202007120411 202007120412
        .then(items => response.json(items))
});


// @route   POST api/items
// @desc    Create A Item
// @access  Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name // {"name":"chicken"}
    });

    newItem.save()
        .then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;