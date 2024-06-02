import { IOid } from "@/src/types/commonTypes";
import { Types } from "mongoose";

export const toOid = (objectId: Types.ObjectId) => {
    return { $oid: objectId.toString() } satisfies IOid;
};

export const toMongoDate = (date: Date) => {
    return { $date: { $numberLong: date.getTime().toString() } };
};
