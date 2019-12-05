
declare namespace publicConfig {
    interface Iconfig {
        hostport:number;
        dbport:number;
        dbroot:string;
        dbpassword:string;
        dbname:"string";
        ignoreJwt:string[];
        jwtserect:string;
    }
}

declare namespace unit {
    interface Ilog {
        print(path:string,str:string,cb?:Function):void;
        dberror(str:string,cb?:Function):void;
        dbsuccess(str:string,cb?:Function):void
        apierror(str:string,cb?:Function):void
    }
}


declare namespace model {
    type p = Promise<any>
    interface IUser {
        create(name:string,passworder:string,isadmin:boolean):p
        findonde(name:string,password?:string):p
        login(name:string,password:string):p
    }

    interface IArtical {
        create(title:string,author:string,tag:object[]):p
        list():p;
        detail(id:string):p;
    }

    interface ITag {
        create(name:string,id:string):p
    }

    interface IComment {
        create(content:string,fid:string,tid:string,aid:string):p;
    }
}