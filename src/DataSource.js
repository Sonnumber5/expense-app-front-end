import axios from "axios";

export default axios.create({
    baseURL: 'http://jack-parkison.us-east-2.elasticbeanstalk.com'
});