import logger from '../../lib/logger';
import moment from 'moment';

class LogRepository {
    private err : 'error' | 'info';
    private title : string;
    private description : string;
    private date = moment().format(`MMMM Do YYYY, h:mm:ss a`);
    private userId: number;
    
    constructor(
    ){};

    setErrType(err : 'error' | 'info') : this{
        this.err = err;
        return this;
    };

    setTitle(title : string) : this {
        this.title = title;
        return this;
    };

    setDescription(description : string) : this {
        this.description = description;
        return this;
    };

    setUserId(userId : number) : this {
        this.userId = userId;
        return this;
    };

    create(){
        if(this.err === 'error'){
            logger.error(
                `
                    title : ${this.title},
                    description : ${this.description},
                    user : ${this.userId},
                    date : ${this.date}
                `
            )
        }else{
            logger.info(
                `
                title : ${this.title},
                description : ${this.description},
                user : ${this.userId},
                date : ${this.date}
                `
            )
        }
    }
};

export default LogRepository;