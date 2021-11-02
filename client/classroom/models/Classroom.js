import DBO from "dbo";
const { dbo } = DBO;
import DataTypes from "sequelize";

if (dbo.Classroom === undefined) {
    dbo.Classroom = DBO.define("classroom",
        {
            "ID": { 
                "type": DataTypes.INTEGER,
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false,
                "noUpdate": true
            },
            "Name": { 
                "type": DataTypes.STRING(200),
                "allowNull": false
            },
            "Code": { 
                "type": DataTypes.STRING(30), 
                "allowNull": false
            },
            "Topic": {
                "type": DataTypes.STRING(200),
                "allowNull": true
            },
            "Description": {
                "type": DataTypes.STRING(200),
                "allowNull": true
            },
            "CreatorID": { 
                "type": DataTypes.INTEGER, 
                "allowNull": false 
            },
            "CreateAt": { 
                "type": DataTypes.DATE,
                "allowNull": false,
                "defaultValue": DataTypes.NOW
            },
            "UpdateAt": { 
                "type": DataTypes.DATE,
                "allowNull": true
            },
            "IsActive": { 
                "type": DataTypes.TINYINT, 
                "defaultValue": 1, 
                "allowNull": false
            },
            "IsDeleted": { 
                "type": DataTypes.TINYINT, 
                "defaultValue": 0, 
                "allowNull": false
            }
        },
        {
            timestamps: false
        }
    );

}
const Classroom = {
    ID: "ID",
    Name: "Name",
    Code: "Code",
    Topic: "Topic",
    Description: "Description",
    CreatorID: "CreatorID",
    CreateAt: "CreateAt",
    UpdateAt: "UpdateAt",
    IsActive: "IsActive",
    IsDeleted: "IsDeleted"
};

export default Classroom;