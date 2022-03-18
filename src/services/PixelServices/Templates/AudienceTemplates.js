let prefix1 = "FTI";
let prefix2 = "DES";
let upid = 7447;
let uuid = "5f1e3682-e9f5-423e-aac4-899d81acfb2a"

//brand or hotel name to filter in specific audiences
let hotel_name = 'Design Plus';

//change to Aux and Unique pageviews
let url_contains = 'designplus'

let prefix = (function () {
    if (prefix2 === "" || prefix2 === undefined) {
        return prefix1 + "-" + prefix1;
    } else {
        return prefix1 + "-" + prefix2;
    }
})();

//https://docs.xandr.com/bundle/xandr-api/page/segment-service.html

export default {
    allPages: {
        "universal_pixel_id": upid,
        "name": prefix + "-" + "ALLPAGES",
        "user_ttl_minutes": 259200,
        "rule": {
            "event": {
                "equals": [
                    "PageView"
                ]
            },
            "pixel_uuid": uuid
        }
    },
    motor1de3: {
        "universal_pixel_id": upid,
        "name": prefix + "-" + "MOTOR1DE3",
        "user_ttl_minutes": 259200,
        "rule": {
            "event": {
                "equals": [
                    "impressions"
                ]
            },
            "pixel_uuid": uuid
        }
    },
    motor2de3: {
        "universal_pixel_id": upid,
        "name": prefix + "-" + "MOTOR2DE3",
        "user_ttl_minutes": 259200,
        "rule": {
            "event": {
                "equals": [
                    "checkout"
                ]
            },
            "pixel_uuid": uuid
        }
    },
    conversion3de3: {
        "universal_pixel_id": upid,
        "name": prefix + "-" + "CONVERSION3DE3",
        "user_ttl_minutes": 259200,
        "rule": {
            "event": {
                "equals": [
                    "Purchase"
                ]
            },
            "pixel_uuid": uuid
        }
    },
    auxAllPages: {
        "universal_pixel_id": upid,
        "name": prefix + "-" + "ALLPAGES",
        "user_ttl_minutes": 259200,
        "rule": {
            "and": [ { "url": { "contains": [ url_contains ] } }, { "event": { "equals": [ 'PageView' ] } } ],
            "pixel_uuid": uuid
        }
    },
    auxMotor1de3: {
        "universal_pixel_id": upid,
        "name": prefix + "-" + "MOTOR1DE3",
        "user_ttl_minutes": 259200,
        "rule": {
            "and": [ { "hotel_name": { "contains": [ hotel_name ] } }, { "event": { "equals": [ 'impressions' ] } } ],
            "pixel_uuid": uuid
        }
    },
    auxMotor2de3: {
        "universal_pixel_id": upid,
        "name": prefix + "-" + "MOTOR2DE3",
        "user_ttl_minutes": 259200,
        "rule": {
            "and": [ { "hotel_name": { "contains": [ hotel_name ] } }, { "event": { "equals": [ 'checkout' ] } } ],
            "pixel_uuid": uuid
        }
    },
    auxConversion3de3: {
        "universal_pixel_id": upid,
        "name": prefix + "-" + "CONVERSION3DE3",
        "user_ttl_minutes": 259200,
        "rule": {
            "and": [ { "hotel_name": { "contains": [ hotel_name ] } }, { "event": { "equals": [ 'Purchase' ] } } ],
            "pixel_uuid": uuid
        }
    },
    uniqueAllPages: {
        "universal_pixel_id": upid,
        "name": prefix + "-" + "ALLPAGES",
        "user_ttl_minutes": 259200,
        "rule": {
            "and": [ { "url": { "contains": [ url_contains ] } }, { "event": { "equals": [ 'PageView' ] } } ],
            "pixel_uuid": uuid
        }
    },
    uniqueMotor1de3: {
        "universal_pixel_id": upid,
        "name": prefix + "-" + "MOTOR1DE3",
        "user_ttl_minutes": 259200,
        "rule": {
            "and": [ { "hotel_name": { "contains": [ hotel_name ] } }, { "event": { "equals": [ 'impressions' ] } } ],
            "pixel_uuid": uuid
        }
    },
    uniqueMotor2de3: {
        "universal_pixel_id": upid,
        "name": prefix + "-" + "MOTOR2DE3",
        "user_ttl_minutes": 259200,
        "rule": {
            "and": [ { "hotel_name": { "contains": [ hotel_name ] } }, { "event": { "equals": [ 'checkout' ] } } ],
            "pixel_uuid": uuid
        }
    },
    uniqueConversion3de3: {
        "universal_pixel_id": upid,
        "name": prefix + "-" + "CONVERSION3DE3",
        "user_ttl_minutes": 259200,
        "rule": {
            "and": [ { "hotel_name": { "contains": [ hotel_name ] } }, { "event": { "equals": [ 'Purchase' ] } } ],
            "pixel_uuid": uuid
        }
    }
}