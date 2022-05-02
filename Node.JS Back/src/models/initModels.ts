import { Sequelize } from "sequelize/types";
import { User } from "./user.model";

export function initModels(sequelize: Sequelize) {
    const UserModel = User.initModel(sequelize);

    return {
        User: UserModel,
    }
}