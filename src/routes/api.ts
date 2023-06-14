import { checkDailyMissionBonusController } from "@/src/controllers/api/checkDailyMissionBonusController";
import { deleteSessionController } from "@/src/controllers/api/deleteSessionController";
import { dronesController } from "@/src/controllers/api/dronesController";
import { findSessionsController } from "@/src/controllers/api/findSessionsController";
import { genericUpdateController } from "@/src/controllers/api/genericUpdateController";
import { getAllianceController } from "@/src/controllers/api/getAllianceController";
import { getCreditsController } from "@/src/controllers/api/getCreditsController";
import { getFriendsController } from "@/src/controllers/api/getFriendsController";
import { getIgnoredUsersController } from "@/src/controllers/api/getIgnoredUsersController";
import { getNewRewardSeedController } from "@/src/controllers/api/getNewRewardSeedController";
import { getShipController } from "@/src/controllers/api/getShipController";
import { hostSessionController } from "@/src/controllers/api/hostSessionController";
import { hubController } from "@/src/controllers/api/hubController";
import { hubInstancesController } from "@/src/controllers/api/hubInstancesController";
import { inboxController } from "@/src/controllers/api/inboxController";
import { inventoryController } from "@/src/controllers/api/inventoryController";
import { loginController } from "@/src/controllers/api/loginController";
import { loginRewardsController } from "@/src/controllers/api/loginRewardsController";
import { logoutController } from "@/src/controllers/api/logoutController";
import { marketRecommendationsController } from "@/src/controllers/api/marketRecommendationsController";
import { missionInventoryUpdateController } from "@/src/controllers/api/missionInventoryUpdateController";
import { modularWeaponSaleController } from "@/src/controllers/api/modularWeaponSaleController";
import { purchaseController } from "@/src/controllers/api/purchaseController";
import { rerollRandomModController } from "@/src/controllers/api/rerollRandomModController";
import { setActiveQuestController } from "@/src/controllers/api/setActiveQuestController";
import { surveysController } from "@/src/controllers/api/surveysController";
import { updateChallengeProgressController } from "@/src/controllers/api/updateChallengeProgressController";
import { updateSessionGetController, updateSessionPostController } from "@/src/controllers/api/updateSessionController";
import { viewController } from "@/src/controllers/api/viewController";
import { joinSessionController } from "@/src/controllers/api/joinSessionController";
import { saveLoadoutController } from "@/src/controllers/api/saveLoadout";

import express from "express";

const apiRouter = express.Router();

// get
apiRouter.get("/inventory.php", inventoryController);
apiRouter.get("/getFriends.php", getFriendsController);
apiRouter.get("/marketRecommendations.php", marketRecommendationsController);
apiRouter.get("/marketSearchRecommendations.php", marketRecommendationsController);
apiRouter.get("/surveys.php", surveysController);
apiRouter.get("/loginRewards.php", loginRewardsController);
apiRouter.get("/checkDailyMissionBonus.php", checkDailyMissionBonusController);
apiRouter.get("/inbox.php", inboxController);
apiRouter.get("/getShip.php", getShipController);
apiRouter.get("/view.php", viewController);
apiRouter.get("/drones.php", dronesController);
apiRouter.get("/getIgnoredUsers.php", getIgnoredUsersController);
apiRouter.get("/getNewRewardSeed.php", getNewRewardSeedController);
apiRouter.get("/setActiveQuest.php", setActiveQuestController);
apiRouter.get("/updateSession.php", updateSessionGetController);
apiRouter.get("/credits.php", getCreditsController);
apiRouter.get("/hubInstances", hubInstancesController);
apiRouter.get("/hub", hubController);
apiRouter.get("/modularWeaponSale.php", modularWeaponSaleController);
apiRouter.get("/deleteSession.php", deleteSessionController);
apiRouter.get("/logout.php", logoutController);

// post
apiRouter.post("/findSessions.php", findSessionsController);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
apiRouter.post("/purchase.php", purchaseController);
apiRouter.post("/login.php", loginController);
apiRouter.post("/getAlliance.php", getAllianceController);
apiRouter.post("/updateChallengeProgress.php", updateChallengeProgressController);
apiRouter.post("/hostSession.php", hostSessionController);
apiRouter.post("/updateSession.php", updateSessionPostController);
apiRouter.post("/missionInventoryUpdate.php", missionInventoryUpdateController);
apiRouter.post("/genericUpdate.php", genericUpdateController);
apiRouter.post("/rerollRandomMod.php", rerollRandomModController);
apiRouter.post("/joinSession.php", joinSessionController);
apiRouter.post("/saveLoadout.php", saveLoadoutController);
export { apiRouter };
