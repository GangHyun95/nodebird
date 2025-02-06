const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init(
            {
                email: {
                    type: Sequelize.STRING(40),
                    allowNull: true,
                    unique: true,
                },
                nick: {
                    type: Sequelize.STRING(15),
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                provider: {
                    type: Sequelize.ENUM('local', 'kakao'),
                    allowNull: false,
                    defaultValue: 'local',
                },
                snsId: {
                    type: Sequelize.STRING(30),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true, // createdAt, updatedAt
                underscored: false, // true일 시 created_at, updated_at
                modelName: 'User', // js에서 쓸 이름
                tableName: 'users', // db의 테이블 이름
                paranoid: true, // deletedAt
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }

    static associate(db) {
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User, {
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow',
        });
        db.User.belongsToMany(db.User, {
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow',
        });
    }
}

module.exports = User;
