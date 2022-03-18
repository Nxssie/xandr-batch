let prefix1 = "AWP";
let prefix2 = "";
let upid = 9801;
let uuid = "7112129e-ebe9-442b-854c-bbd76761d534";
let hotel_name = '';

let prefix = (function () {
    if (prefix2 === "" || prefix2 === undefined) {
        return prefix1 + "-" + prefix1;
    } else {
        return prefix1 + "-" + prefix2;
    }
})();

//https://docs.xandr.com/bundle/xandr-api/page/conversion-pixel-service.html

export default {
    motor1de3: {
        "universal_pixel_id": upid,
        "name": prefix + "-" + "MOTOR1DE3",
        "conversion_category_id": 3,
        "conversion_category_custom": "Impressions",
        "count_type": "hybrid",
        "min_minutes_per_conv": 0,
        "post_view_value": 0,
        "post_click_value": 0,
        "post_click_expire_minutes": 43200,
        "post_view_expire_minutes": 43200,
        "rule": {
            "event": { "equals": ["impressions"] },
            "pixel_uuid": uuid
        }
    },
    conversion3de3: {
        "universal_pixel_id": upid,
        "name": prefix + "-" + "CONVERSION3DE3",
        "conversion_category_id": 7,
        "conversion_category_custom": "Purchase",
        "count_type": "hybrid",
        "min_minutes_per_conv": 0,
        "post_view_value": 0,
        "post_click_value": 0,
        "post_click_expire_minutes": 43200,
        "post_view_expire_minutes": 43200,
        "rule": {
            "event": { "equals": ["Purchase"] },
            "pixel_uuid": uuid
        }
    },
    auxMotor1de3: {
        "universal_pixel_id": upid,
        "name": prefix + "-" + "MOTOR1DE3",
        "conversion_category_id": 3,
        "conversion_category_custom": "Impressions",
        "count_type": "hybrid",
        "min_minutes_per_conv": 0,
        "post_view_value": 0,
        "post_click_value": 0,
        "post_click_expire_minutes": 43200,
        "post_view_expire_minutes": 43200,
        "rule": {
            "and": [{ "hotelName": { "contains": [hotel_name] } }, { "event": { "equals": ['impressions'] } }],
            "pixel_uuid": uuid
        }
    },
    auxMotor2de3: {
        "universal_pixel_id": upid,
        "name": prefix + "-" + "MOTOR2DE3",
        "conversion_category_id": 5,
        "conversion_category_custom": "Checkout",
        "count_type": "hybrid",
        "min_minutes_per_conv": 0,
        "post_view_value": 0,
        "post_click_value": 0,
        "post_click_expire_minutes": 43200,
        "post_view_expire_minutes": 43200,
        "rule": {
            "and": [{ "hotelName": { "contains": [hotel_name] } }, { "event": { "equals": ['checkout'] } }],
            "pixel_uuid": uuid
        }
    },
    auxConversion3de3: {
        "universal_pixel_id": upid,
        "name": prefix + "-" + "CONVERSION3DE3",
        "conversion_category_id": 7,
        "conversion_category_custom": "Purchase",
        "count_type": "hybrid",
        "min_minutes_per_conv": 0,
        "post_view_value": 0,
        "post_click_value": 0,
        "post_click_expire_minutes": 43200,
        "post_view_expire_minutes": 43200,
        "rule": {
            "and": [{ "hotelName": { "contains": [hotel_name] } }, { "event": { "equals": ['Purchase'] } }],
            "pixel_uuid": uuid
        }
    },

}