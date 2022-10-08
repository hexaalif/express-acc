const express = require("express");
const toolsController = require("../../controllers/tools.controller");
const limiter = require("../../middleware/limiter");
const viewCount = require("../../middleware/viewCount");

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("tools found");
// });

// router.post("/", (req, res) => {
//   res.send("tools added");
// });

router
  .route("/:id")
  .get(viewCount, limiter, toolsController.getToolDetail)
  .patch(toolsController.updateTools)
  .delete(toolsController.deleteTool)
  /**
   * @api {get} tools All tools
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {string} Authorization user's access token
   * @apiParam {number{1-}}       [page-1]  list page
   * @apiParam {Number{1-100}}    [limit-10] users per page
   *
   * @apiSuccess  {object[]} all the tools
   *
   * @apiError    {unauthorized 401}  Unauthorized Only authenticated users can access
   * @apiError    {forbidden 403}     forbidden only
   */
  .get(toolsController.getAllTools)

  /**
   *
   */
  .post(toolsController.saveATool);

router
  .route("/:id")
  .get(
    viewCount,
    limiter,
    toolsController.updateTools,
    toolsController.getToolDetail
  );

module.exports = router;
