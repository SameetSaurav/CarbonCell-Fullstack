import { Router } from "express";
import { apiAuth, loginUser, logoutUser, profileUser, registerUser, ethereumBalance } from "../controller/userController.js";
import { userAuth } from "../../middleware.js";

const router = Router()

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management APIs
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *          description: User already exists
 *       '500':
 *         description: Internal server error
 */
router.route("/register").post(registerUser);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login with username and password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Unauthorized - Invalid credentials
 *       '500':
 *         description: Internal server error
 */
router.route("/login").post(loginUser)


/**
 * @swagger
 * /api/logout:
 *   get:
 *     summary: Log out user
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *       '401':
 *         description: Unauthorized - User not logged in
 *       '500':
 *         description: Internal server error
 */
router.route("/logout").get(logoutUser)

/**
 * @swagger
 * /api/apiData:
 *   get:
 *     summary: Get data from API
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Data retrieved successfully
 *       '401':
 *         description: Unauthorized - User not authenticated
 *       '500':
 *         description: Internal server error
 */
router.route("/apiData").get(userAuth, apiAuth);


/**
 * @swagger
 * /api/balance/{address}:
 *   get:
 *     summary: Get Ethereum account balance
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         description: Ethereum address for which balance is to be retrieved
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: string
 *                   description: The balance of the Ethereum account in ETH
 *       '400':
 *         description: Invalid Ethereum address
 *       '500':
 *         description: Internal server error
 */
router.route('/balance/:address').get(ethereumBalance);


export default router