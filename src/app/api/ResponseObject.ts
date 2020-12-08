export interface ResponseObject {

    /**
     * The status of the response, May be 'success', 'fail', or 'error'.
     */
    status: string;

    /**
     * The data relevant to the repsonse.
     */
    data?: any;

    /**
     * In case of error, the error message.
     */
    message?: string;

    /**
     * In case of error, the error code.
     */
    code?: number;
}