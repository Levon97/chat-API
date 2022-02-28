const router = require('express').Router();

router.get('/sync', (req,res)=>{
    res.json()
});
router.put('/sync-cases', fetchController.branchCasesMapStore);

module.exports = router;
