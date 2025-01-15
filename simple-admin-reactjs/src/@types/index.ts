export type IAuthValue = {
    user: object;
    token: string;
    login?: (user:object, token:string) => void;
    logout?: () => void;
}

export interface Iprops {
    children?: React.ReactNode;
    userData?:any;
}