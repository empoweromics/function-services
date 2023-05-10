import bcrypt from "bcrypt";
/**
 * @class HashHelper
 */
class HashHelper {
  /**
   * Hashes password
   * @param {String} password - Password to hash
   * @returns {String} - hashed Password
   */
  static hashPassword(password: string): string {
    return bcrypt.hashSync(password, 8);
  }

  /**
   * Compares Passwords
   * @param {String} password - Password provided by a user
   * @param {String} passwordToCompare - Password from Database
   * @returns {Boolean} -True if they're equal, otherwise false
   */
  static comparePassword(password: string, passwordToCompare: string): boolean {
    return bcrypt.compareSync(password, passwordToCompare);
  }
}

export default HashHelper;
