export interface paths {
    "/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Login the User */
        post: operations["loginUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Register the User */
        post: operations["registerUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/destroy-session": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Request to Destroy User Session */
        delete: operations["destroyUserSession"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/log-out": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Logout User
         * @description Logout the user from the system and delete the attached cookie
         */
        post: operations["logoutUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/sessions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get User's Sessions */
        get: operations["userSessions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/user-info": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Patch User's Information */
        patch: operations["patchUserInfo"];
        trace?: never;
    };
    "/auth/user-password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Patch User's Password */
        patch: operations["patchUserPassword"];
        trace?: never;
    };
    "/accounts/institutions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get all Institutions */
        get: operations["getInstitutions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/create-requisition": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create a Requisition Request */
        post: operations["createRequisition"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/available/{requisitionId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Available Accounts */
        get: operations["getAvailableAccounts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get User's Accounts */
        get: operations["getUsersAccounts"];
        put?: never;
        /**
         * Create User's Account
         * @description Create a new account for the user and sync the transactions to the database
         */
        post: operations["createUsersAccount"];
        /** Delete User's Account */
        delete: operations["deleteUsersAccount"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/{accountId}/transactions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Account Transactions */
        get: operations["getAccountTransactions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/{accountId}/transactions/monthly-overview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Account Transactions' Monthly Overview */
        get: operations["getAccountTransactionsMonthlyOverview"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/transactions/sync": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Sync Account Transactions */
        get: operations["syncAccountTransactions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/sync": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Sync Account Statuses */
        get: operations["syncAccountStatuses"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        ApiResponse: {
            /** @example true */
            success: boolean;
        };
        ApiError: {
            /** @example false */
            success: boolean;
            code: components["schemas"]["ErrorCodes"];
        };
        /** @enum {string} */
        ErrorCodes: ErrorCodes;
        /** @enum {string} */
        AccountStatuses: AccountStatuses;
        /** @enum {string} */
        Categories: Categories;
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    loginUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * Format: email
                     * @example name@gmail.com
                     */
                    email: string;
                    /**
                     * Format: password
                     * @example password
                     */
                    password: string;
                };
            };
        };
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            user: {
                                /**
                                 * Format: email
                                 * @example name@gmail.com
                                 */
                                email: string;
                                /** @example name */
                                name: string;
                            };
                        };
                    } & components["schemas"]["ApiResponse"];
                };
            };
            /** @description Wrong Credentials */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
            /** @description Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
        };
    };
    registerUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @example name */
                    name: string;
                    /**
                     * Format: email
                     * @example name@gmail.com
                     */
                    email: string;
                    /**
                     * Format: password
                     * @example password
                     */
                    password: string;
                };
            };
        };
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiResponse"];
                };
            };
            /** @description User with the same email already exists */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
            /** @description Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
        };
    };
    destroyUserSession: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @example 012c8134-ca32-4120-8714-0db5c12f66fc */
                    sessionId: string;
                };
            };
        };
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiResponse"];
                };
            };
            /** @description Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
        };
    };
    logoutUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiResponse"];
                };
            };
            /** @description Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
        };
    };
    userSessions: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            /** @example true */
                            isCurrent: string;
                            /** @example 012c8134-ca32-4120-8714-0db5c12f66fc */
                            sessionId: string;
                            /** @example 192.168.1.1 */
                            ipAddress: string;
                            /** @example Denmark, Copenhagen */
                            ipLocation: string;
                        }[];
                    } & components["schemas"]["ApiResponse"];
                };
            };
            /** @description Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
        };
    };
    patchUserInfo: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @example name */
                    name: string;
                    /**
                     * Format: email
                     * @example name@gmail.com
                     */
                    email: string;
                };
            };
        };
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            /** @example name */
                            name: string;
                            /**
                             * Format: email
                             * @example name@gmail.com
                             */
                            email: string;
                        };
                    } & components["schemas"]["ApiResponse"];
                };
            };
            /** @description User with the same email already exists */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
            /** @description Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
        };
    };
    patchUserPassword: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * Format: password
                     * @example weak-password
                     */
                    oldPassword: string;
                    /**
                     * Format: password
                     * @example very-strong-password
                     */
                    newPassword: string;
                };
            };
        };
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiResponse"];
                };
            };
            /** @description Wrong Old Password */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
            /** @description Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
        };
    };
    getInstitutions: {
        parameters: {
            query?: {
                /** @description The query to search among institution names */
                query?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            /** @example SANDBOXFINANCE_SFIN0000 */
                            id: string;
                            /** @example Sandbox Finance */
                            name: string;
                            /** @example https://cdn-logos.gocardless.com/ais/SANDBOXFINANCE_SFIN0000.png */
                            logo: string;
                        }[];
                    } & components["schemas"]["ApiResponse"];
                };
            };
            /** @description Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
        };
    };
    createRequisition: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @example SANDBOXFINANCE_SFIN0000 */
                    institutionId: string;
                    /** @example https://www.spendify.dk/link-account */
                    redirect: string;
                };
            };
        };
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            /** @example https://ob.gocardless.com/psd2/start/3fa85f64-5717-4562-b3fc-2c963f66afa6/{$INSTITUTION_ID} */
                            url: string;
                        };
                    } & components["schemas"]["ApiResponse"];
                };
            };
            /** @description Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
        };
    };
    getAvailableAccounts: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The requisition approved by the user */
                requisitionId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            /** @example bbcdb297-acce-4d4a-8678-8344ee92d195 */
                            accountId: string;
                            /** @example Account Name */
                            accountName?: string;
                            /** @example DK4404005032950081 */
                            accountIban?: string;
                            /** @example 50.380,90 */
                            accountBalance: string;
                            /** @example https://cdn-logos.gocardless.com/ais/SANDBOXFINANCE_SFIN0000.png */
                            institutionLogo: string;
                        }[];
                    } & components["schemas"]["ApiResponse"];
                };
            };
            /** @description Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
        };
    };
    getUsersAccounts: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            accounts: {
                                /** @example bbcdb297-acce-4d4a-8678-8344ee92d195 */
                                id: string;
                                /** @example Account Name */
                                name: string | null;
                                status: components["schemas"]["AccountStatuses"];
                                /** @example DK4404005032950081 */
                                iban: string | null;
                                /** @example 50.380,90 */
                                balance: string;
                                /** @example SANDBOXFINANCE_SFIN0000 */
                                institutionId: string;
                                /** @example Sandbox Finance */
                                institutionName: string | null;
                                /** @example https://cdn-logos.gocardless.com/ais/SANDBOXFINANCE_SFIN0000.png */
                                institutionLogo: string | null;
                                /**
                                 * Format: date-time
                                 * @example 2024-08-31 13:00:50.375
                                 */
                                lastSyncedAt: string;
                            }[];
                        };
                    } & components["schemas"]["ApiResponse"];
                };
            };
            /** @description Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
        };
    };
    createUsersAccount: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @example bbcdb297-acce-4d4a-8678-8344ee92d195 */
                    accountId: string;
                    /** @example 3fa85f64-5717-4562-b3fc-2c963f66afa6 */
                    requisitionId: string;
                };
            };
        };
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiResponse"];
                };
            };
            /** @description Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
        };
    };
    deleteUsersAccount: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @example bbcdb297-acce-4d4a-8678-8344ee92d195 */
                    accountId: string;
                };
            };
        };
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiResponse"];
                };
            };
            /** @description Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
        };
    };
    getAccountTransactions: {
        parameters: {
            query?: {
                /** @description The query to search among transaction names */
                search?: string;
                /** @description Category to filter transactions */
                category?: components["schemas"]["Categories"];
                from?: string;
                to?: string;
            };
            header?: never;
            path: {
                /** @description User's Account ID */
                accountId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            /** @example 50092050006000@YEDLE167@2024-08-27@2024-08-27-03.23.07.019118 */
                            id: string;
                            /** @example KVICKLY SUNDBY, KOEBENHAVN S Notanr 42215 */
                            title: string;
                            /** @example 10 */
                            weight: number;
                            /** @example -55,95 */
                            amount: string;
                            /**
                             * @description Total balance left after the transaction
                             * @example 50.380,90
                             */
                            totalAmount: string;
                            /** @example 50380.9 */
                            totalAmountInt: number;
                            /** @example Food & Groceries */
                            category: components["schemas"]["Categories"];
                            /**
                             * Format: date-time
                             * @example 2024-08-27 00:00:00
                             */
                            date: string;
                        }[];
                    } & components["schemas"]["ApiResponse"];
                };
            };
            /** @description Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
        };
    };
    getAccountTransactionsMonthlyOverview: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description User's Account ID */
                accountId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            /**
                             * Format: date
                             * @example September, 2024
                             */
                            date: string;
                            /** @example 10.979,45 */
                            expenses: string;
                            /** @example 10979.45 */
                            expensesInt: number;
                            /** @example 12.627,45 */
                            income: string;
                            /** @example 12627.45 */
                            incomeInt: number;
                        }[];
                    } & components["schemas"]["ApiResponse"];
                };
            };
            /** @description Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
        };
    };
    syncAccountTransactions: {
        parameters: {
            query: {
                /** @description SYNC_ADMIN_KEY */
                admin_key: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiResponse"];
                };
            };
            /** @description Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
        };
    };
    syncAccountStatuses: {
        parameters: {
            query: {
                /** @description SYNC_ADMIN_KEY */
                admin_key: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiResponse"];
                };
            };
            /** @description Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiError"];
                };
            };
        };
    };
}
export enum ErrorCodes {
    UNKNOWN = "UNKNOWN",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    USER_EXISTS = "USER_EXISTS",
    DUPLICATE_ACCOUNTS = "DUPLICATE_ACCOUNTS",
    INVALID_SCHEMA = "INVALID_SCHEMA",
    UNAUTHORIZED = "UNAUTHORIZED"
}
export enum AccountStatuses {
    READY = "READY",
    EXPIRED = "EXPIRED"
}
export enum Categories {
    Food_Groceries = "Food & Groceries",
    Utilities = "Utilities",
    Transfers = "Transfers"
}
