export interface authUser {
    email: string;
    password: string;
}

interface Success {
    success: boolean;
    message: string;
    toPass?: any;
}

export interface user {
    email: string;
    id: string;
}



export type FunctionResponse = Success;