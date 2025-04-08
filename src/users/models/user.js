/**
 * @typedef {Object} UserData
 * @property {String} id
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} avatar
 * @property {Number} balance
 * @property {String} gender
 * @property {Boolean} isActive
 */
export class User {
    /**
     *
     * @param {UserData} userData
     */
    constructor({ id, firstName, lastName, avatar, balance, gender, isActive }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatar = avatar;
        this.balance = balance;
        this.gender = gender;
        this.isActive = isActive;
    }
}
