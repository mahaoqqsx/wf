import { parseString } from "@/src/helpers/general";
import { getJSONfromString } from "@/src/helpers/stringHelpers";
import { startRecipe } from "@/src/services/recipeService";
import { logger } from "@/src/utils/logger";
import { RequestHandler } from "express";

interface IStartRecipeRequest {
    RecipeName: string;
    Ids: string[];
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
export const startRecipeController: RequestHandler = async (req, res) => {
    const startRecipeRequest = getJSONfromString(req.body.toString()) as IStartRecipeRequest;
    logger.debug("StartRecipe Request", { startRecipeRequest });

    const accountId = parseString(req.query.accountId);

    const newRecipeId = await startRecipe(startRecipeRequest.RecipeName, accountId);
    res.json(newRecipeId);
};
