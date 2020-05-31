const _ = require('lodash');

const categories = [
  {
    id: 'plants',
    name: 'Plants',
    tags: ['products', 'inspirations'],
    count: 147,
    image: require('../assets/icons/plants.png'),
  },
  {
    id: 'seeds',
    name: 'Seeds',
    tags: ['products', 'shop'],
    count: 16,
    image: require('../assets/icons/seeds.png'),
  },
  {
    id: 'flowers',
    name: 'Flowers',
    tags: ['products', 'inspirations'],
    count: 68,
    image: require('../assets/icons/flowers.png'),
  },
  {
    id: 'sprayers',
    name: 'Sprayers',
    tags: ['products', 'shop'],
    count: 17,
    image: require('../assets/icons/sprayers.png'),
  },
  {
    id: 'pots',
    name: 'Pots',
    tags: ['products', 'shop'],
    count: 47,
    image: require('../assets/icons/pots.png'),
  },
  {
    id: 'fertilizers',
    name: 'fertilizers',
    tags: ['products', 'shop'],
    count: 47,
    image: require('../assets/icons/fertilizers.png'),
  },
];

const products = [
  {
    id: 1,
    name: '16 Best Plants That Thrive In Your Bedroom',
    description:
      'Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.',
    tags: ['Interior', '27 m²', 'Ideas'],
    images: [
      require('../assets/images/plants_1.png'),
      require('../assets/images/plants_2.png'),
      require('../assets/images/plants_3.png'),
      // showing only 3 images, show +6 for the rest
      require('../assets/images/plants_1.png'),
      require('../assets/images/plants_2.png'),
      require('../assets/images/plants_3.png'),
      require('../assets/images/plants_1.png'),
      require('../assets/images/plants_2.png'),
      require('../assets/images/plants_3.png'),
    ],
  },
];

const explore = [
  // images
  require('../assets/images/explore_1.png'),
  require('../assets/images/explore_2.png'),
  require('../assets/images/explore_3.png'),
  require('../assets/images/explore_4.png'),
  require('../assets/images/explore_5.png'),
  require('../assets/images/explore_6.png'),
];

const profile = {
  username: 'react-ui-kit',
  location: 'Europe',
  email: 'contact@react-ui-kit.com',
  avatar: require('../assets/images/avatar.png'),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false,
};


const countries=[
  {
      "name": "Afghanistan",
      "code": "AF"
  },
  {
      "name": "Åland Islands",
      "code": "AX"
  },
  {
      "name": "Albania",
      "code": "AL"
  },
  {
      "name": "Algeria",
      "code": "DZ"
  },
  {
      "name": "American Samoa",
      "code": "AS"
  },
  {
      "name": "AndorrA",
      "code": "AD"
  },
  {
      "name": "Angola",
      "code": "AO"
  },
  {
      "name": "Anguilla",
      "code": "AI"
  },
  {
      "name": "Antarctica",
      "code": "AQ"
  },
  {
      "name": "Antigua and Barbuda",
      "code": "AG"
  },
  {
      "name": "Argentina",
      "code": "AR"
  },
  {
      "name": "Armenia",
      "code": "AM"
  },
  {
      "name": "Aruba",
      "code": "AW"
  },
  {
      "name": "Australia",
      "code": "AU"
  },
  {
      "name": "Austria",
      "code": "AT"
  },
  {
      "name": "Azerbaijan",
      "code": "AZ"
  },
  {
      "name": "Bahamas",
      "code": "BS"
  },
  {
      "name": "Bahrain",
      "code": "BH"
  },
  {
      "name": "Bangladesh",
      "code": "BD"
  },
  {
      "name": "Barbados",
      "code": "BB"
  },
  {
      "name": "Belarus",
      "code": "BY"
  },
  {
      "name": "Belgium",
      "code": "BE"
  },
  {
      "name": "Belize",
      "code": "BZ"
  },
  {
      "name": "Benin",
      "code": "BJ"
  },
  {
      "name": "Bermuda",
      "code": "BM"
  },
  {
      "name": "Bhutan",
      "code": "BT"
  },
  {
      "name": "Bolivia",
      "code": "BO"
  },
  {
      "name": "Bosnia and Herzegovina",
      "code": "BA"
  },
  {
      "name": "Botswana",
      "code": "BW"
  },
  {
      "name": "Bouvet Island",
      "code": "BV"
  },
  {
      "name": "Brazil",
      "code": "BR"
  },
  {
      "name": "British Indian Ocean Territory",
      "code": "IO"
  },
  {
      "name": "Brunei Darussalam",
      "code": "BN"
  },
  {
      "name": "Bulgaria",
      "code": "BG"
  },
  {
      "name": "Burkina Faso",
      "code": "BF"
  },
  {
      "name": "Burundi",
      "code": "BI"
  },
  {
      "name": "Cambodia",
      "code": "KH"
  },
  {
      "name": "Cameroon",
      "code": "CM"
  },
  {
      "name": "Canada",
      "code": "CA"
  },
  {
      "name": "Cape Verde",
      "code": "CV"
  },
  {
      "name": "Cayman Islands",
      "code": "KY"
  },
  {
      "name": "Central African Republic",
      "code": "CF"
  },
  {
      "name": "Chad",
      "code": "TD"
  },
  {
      "name": "Chile",
      "code": "CL"
  },
  {
      "name": "China",
      "code": "CN"
  },
  {
      "name": "Christmas Island",
      "code": "CX"
  },
  {
      "name": "Cocos (Keeling) Islands",
      "code": "CC"
  },
  {
      "name": "Colombia",
      "code": "CO"
  },
  {
      "name": "Comoros",
      "code": "KM"
  },
  {
      "name": "Congo",
      "code": "CG"
  },
  {
      "name": "Congo, The Democratic Republic of the",
      "code": "CD"
  },
  {
      "name": "Cook Islands",
      "code": "CK"
  },
  {
      "name": "Costa Rica",
      "code": "CR"
  },
  {
      "name": "Cote D\"Ivoire",
      "code": "CI"
  },
  {
      "name": "Croatia",
      "code": "HR"
  },
  {
      "name": "Cuba",
      "code": "CU"
  },
  {
      "name": "Cyprus",
      "code": "CY"
  },
  {
      "name": "Czech Republic",
      "code": "CZ"
  },
  {
      "name": "Denmark",
      "code": "DK"
  },
  {
      "name": "Djibouti",
      "code": "DJ"
  },
  {
      "name": "Dominica",
      "code": "DM"
  },
  {
      "name": "Dominican Republic",
      "code": "DO"
  },
  {
      "name": "Ecuador",
      "code": "EC"
  },
  {
      "name": "Egypt",
      "code": "EG"
  },
  {
      "name": "El Salvador",
      "code": "SV"
  },
  {
      "name": "Equatorial Guinea",
      "code": "GQ"
  },
  {
      "name": "Eritrea",
      "code": "ER"
  },
  {
      "name": "Estonia",
      "code": "EE"
  },
  {
      "name": "Ethiopia",
      "code": "ET"
  },
  {
      "name": "Falkland Islands (Malvinas)",
      "code": "FK"
  },
  {
      "name": "Faroe Islands",
      "code": "FO"
  },
  {
      "name": "Fiji",
      "code": "FJ"
  },
  {
      "name": "Finland",
      "code": "FI"
  },
  {
      "name": "France",
      "code": "FR"
  },
  {
      "name": "French Guiana",
      "code": "GF"
  },
  {
      "name": "French Polynesia",
      "code": "PF"
  },
  {
      "name": "French Southern Territories",
      "code": "TF"
  },
  {
      "name": "Gabon",
      "code": "GA"
  },
  {
      "name": "Gambia",
      "code": "GM"
  },
  {
      "name": "Georgia",
      "code": "GE"
  },
  {
      "name": "Germany",
      "code": "DE"
  },
  {
      "name": "Ghana",
      "code": "GH"
  },
  {
      "name": "Gibraltar",
      "code": "GI"
  },
  {
      "name": "Greece",
      "code": "GR"
  },
  {
      "name": "Greenland",
      "code": "GL"
  },
  {
      "name": "Grenada",
      "code": "GD"
  },
  {
      "name": "Guadeloupe",
      "code": "GP"
  },
  {
      "name": "Guam",
      "code": "GU"
  },
  {
      "name": "Guatemala",
      "code": "GT"
  },
  {
      "name": "Guernsey",
      "code": "GG"
  },
  {
      "name": "Guinea",
      "code": "GN"
  },
  {
      "name": "Guinea-Bissau",
      "code": "GW"
  },
  {
      "name": "Guyana",
      "code": "GY"
  },
  {
      "name": "Haiti",
      "code": "HT"
  },
  {
      "name": "Heard Island and Mcdonald Islands",
      "code": "HM"
  },
  {
      "name": "Holy See (Vatican City State)",
      "code": "VA"
  },
  {
      "name": "Honduras",
      "code": "HN"
  },
  {
      "name": "Hong Kong",
      "code": "HK"
  },
  {
      "name": "Hungary",
      "code": "HU"
  },
  {
      "name": "Iceland",
      "code": "IS"
  },
  {
      "name": "India",
      "code": "IN"
  },
  {
      "name": "Indonesia",
      "code": "ID"
  },
  {
      "name": "Iran, Islamic Republic Of",
      "code": "IR"
  },
  {
      "name": "Iraq",
      "code": "IQ"
  },
  {
      "name": "Ireland",
      "code": "IE"
  },
  {
      "name": "Isle of Man",
      "code": "IM"
  },
  {
      "name": "Israel",
      "code": "IL"
  },
  {
      "name": "Italy",
      "code": "IT"
  },
  {
      "name": "Jamaica",
      "code": "JM"
  },
  {
      "name": "Japan",
      "code": "JP"
  },
  {
      "name": "Jersey",
      "code": "JE"
  },
  {
      "name": "Jordan",
      "code": "JO"
  },
  {
      "name": "Kazakhstan",
      "code": "KZ"
  },
  {
      "name": "Kenya",
      "code": "KE"
  },
  {
      "name": "Kiribati",
      "code": "KI"
  },
  {
      "name": "Korea, Democratic People\"S Republic of",
      "code": "KP"
  },
  {
      "name": "Korea, Republic of",
      "code": "KR"
  },
  {
      "name": "Kuwait",
      "code": "KW"
  },
  {
      "name": "Kyrgyzstan",
      "code": "KG"
  },
  {
      "name": "Lao People\"S Democratic Republic",
      "code": "LA"
  },
  {
      "name": "Latvia",
      "code": "LV"
  },
  {
      "name": "Lebanon",
      "code": "LB"
  },
  {
      "name": "Lesotho",
      "code": "LS"
  },
  {
      "name": "Liberia",
      "code": "LR"
  },
  {
      "name": "Libyan Arab Jamahiriya",
      "code": "LY"
  },
  {
      "name": "Liechtenstein",
      "code": "LI"
  },
  {
      "name": "Lithuania",
      "code": "LT"
  },
  {
      "name": "Luxembourg",
      "code": "LU"
  },
  {
      "name": "Macao",
      "code": "MO"
  },
  {
      "name": "Macedonia, The Former Yugoslav Republic of",
      "code": "MK"
  },
  {
      "name": "Madagascar",
      "code": "MG"
  },
  {
      "name": "Malawi",
      "code": "MW"
  },
  {
      "name": "Malaysia",
      "code": "MY"
  },
  {
      "name": "Maldives",
      "code": "MV"
  },
  {
      "name": "Mali",
      "code": "ML"
  },
  {
      "name": "Malta",
      "code": "MT"
  },
  {
      "name": "Marshall Islands",
      "code": "MH"
  },
  {
      "name": "Martinique",
      "code": "MQ"
  },
  {
      "name": "Mauritania",
      "code": "MR"
  },
  {
      "name": "Mauritius",
      "code": "MU"
  },
  {
      "name": "Mayotte",
      "code": "YT"
  },
  {
      "name": "Mexico",
      "code": "MX"
  },
  {
      "name": "Micronesia, Federated States of",
      "code": "FM"
  },
  {
      "name": "Moldova, Republic of",
      "code": "MD"
  },
  {
      "name": "Monaco",
      "code": "MC"
  },
  {
      "name": "Mongolia",
      "code": "MN"
  },
  {
      "name": "Montserrat",
      "code": "MS"
  },
  {
      "name": "Morocco",
      "code": "MA"
  },
  {
      "name": "Mozambique",
      "code": "MZ"
  },
  {
      "name": "Myanmar",
      "code": "MM"
  },
  {
      "name": "Namibia",
      "code": "NA"
  },
  {
      "name": "Nauru",
      "code": "NR"
  },
  {
      "name": "Nepal",
      "code": "NP"
  },
  {
      "name": "Netherlands",
      "code": "NL"
  },
  {
      "name": "Netherlands Antilles",
      "code": "AN"
  },
  {
      "name": "New Caledonia",
      "code": "NC"
  },
  {
      "name": "New Zealand",
      "code": "NZ"
  },
  {
      "name": "Nicaragua",
      "code": "NI"
  },
  {
      "name": "Niger",
      "code": "NE"
  },
  {
      "name": "Nigeria",
      "code": "NG"
  },
  {
      "name": "Niue",
      "code": "NU"
  },
  {
      "name": "Norfolk Island",
      "code": "NF"
  },
  {
      "name": "Northern Mariana Islands",
      "code": "MP"
  },
  {
      "name": "Norway",
      "code": "NO"
  },
  {
      "name": "Oman",
      "code": "OM"
  },
  {
      "name": "Pakistan",
      "code": "PK"
  },
  {
      "name": "Palau",
      "code": "PW"
  },
  {
      "name": "Palestinian Territory, Occupied",
      "code": "PS"
  },
  {
      "name": "Panama",
      "code": "PA"
  },
  {
      "name": "Papua New Guinea",
      "code": "PG"
  },
  {
      "name": "Paraguay",
      "code": "PY"
  },
  {
      "name": "Peru",
      "code": "PE"
  },
  {
      "name": "Philippines",
      "code": "PH"
  },
  {
      "name": "Pitcairn",
      "code": "PN"
  },
  {
      "name": "Poland",
      "code": "PL"
  },
  {
      "name": "Portugal",
      "code": "PT"
  },
  {
      "name": "Puerto Rico",
      "code": "PR"
  },
  {
      "name": "Qatar",
      "code": "QA"
  },
  {
      "name": "Reunion",
      "code": "RE"
  },
  {
      "name": "Romania",
      "code": "RO"
  },
  {
      "name": "Russian Federation",
      "code": "RU"
  },
  {
      "name": "RWANDA",
      "code": "RW"
  },
  {
      "name": "Saint Helena",
      "code": "SH"
  },
  {
      "name": "Saint Kitts and Nevis",
      "code": "KN"
  },
  {
      "name": "Saint Lucia",
      "code": "LC"
  },
  {
      "name": "Saint Pierre and Miquelon",
      "code": "PM"
  },
  {
      "name": "Saint Vincent and the Grenadines",
      "code": "VC"
  },
  {
      "name": "Samoa",
      "code": "WS"
  },
  {
      "name": "San Marino",
      "code": "SM"
  },
  {
      "name": "Sao Tome and Principe",
      "code": "ST"
  },
  {
      "name": "Saudi Arabia",
      "code": "SA"
  },
  {
      "name": "Senegal",
      "code": "SN"
  },
  {
      "name": "Serbia and Montenegro",
      "code": "CS"
  },
  {
      "name": "Seychelles",
      "code": "SC"
  },
  {
      "name": "Sierra Leone",
      "code": "SL"
  },
  {
      "name": "Singapore",
      "code": "SG"
  },
  {
      "name": "Slovakia",
      "code": "SK"
  },
  {
      "name": "Slovenia",
      "code": "SI"
  },
  {
      "name": "Solomon Islands",
      "code": "SB"
  },
  {
      "name": "Somalia",
      "code": "SO"
  },
  {
      "name": "South Africa",
      "code": "ZA"
  },
  {
      "name": "South Georgia and the South Sandwich Islands",
      "code": "GS"
  },
  {
      "name": "Spain",
      "code": "ES"
  },
  {
      "name": "Sri Lanka",
      "code": "LK"
  },
  {
      "name": "Sudan",
      "code": "SD"
  },
  {
      "name": "Suriname",
      "code": "SR"
  },
  {
      "name": "Svalbard and Jan Mayen",
      "code": "SJ"
  },
  {
      "name": "Swaziland",
      "code": "SZ"
  },
  {
      "name": "Sweden",
      "code": "SE"
  },
  {
      "name": "Switzerland",
      "code": "CH"
  },
  {
      "name": "Syrian Arab Republic",
      "code": "SY"
  },
  {
      "name": "Taiwan, Province of China",
      "code": "TW"
  },
  {
      "name": "Tajikistan",
      "code": "TJ"
  },
  {
      "name": "Tanzania, United Republic of",
      "code": "TZ"
  },
  {
      "name": "Thailand",
      "code": "TH"
  },
  {
      "name": "Timor-Leste",
      "code": "TL"
  },
  {
      "name": "Togo",
      "code": "TG"
  },
  {
      "name": "Tokelau",
      "code": "TK"
  },
  {
      "name": "Tonga",
      "code": "TO"
  },
  {
      "name": "Trinidad and Tobago",
      "code": "TT"
  },
  {
      "name": "Tunisia",
      "code": "TN"
  },
  {
      "name": "Turkey",
      "code": "TR"
  },
  {
      "name": "Turkmenistan",
      "code": "TM"
  },
  {
      "name": "Turks and Caicos Islands",
      "code": "TC"
  },
  {
      "name": "Tuvalu",
      "code": "TV"
  },
  {
      "name": "Uganda",
      "code": "UG"
  },
  {
      "name": "Ukraine",
      "code": "UA"
  },
  {
      "name": "United Arab Emirates",
      "code": "AE"
  },
  {
      "name": "United Kingdom",
      "code": "GB"
  },
  {
      "name": "United States",
      "code": "US"
  },
  {
      "name": "United States Minor Outlying Islands",
      "code": "UM"
  },
  {
      "name": "Uruguay",
      "code": "UY"
  },
  {
      "name": "Uzbekistan",
      "code": "UZ"
  },
  {
      "name": "Vanuatu",
      "code": "VU"
  },
  {
      "name": "Venezuela",
      "code": "VE"
  },
  {
      "name": "Viet Nam",
      "code": "VN"
  },
  {
      "name": "Virgin Islands, British",
      "code": "VG"
  },
  {
      "name": "Virgin Islands, U.S.",
      "code": "VI"
  },
  {
      "name": "Wallis and Futuna",
      "code": "WF"
  },
  {
      "name": "Western Sahara",
      "code": "EH"
  },
  {
      "name": "Yemen",
      "code": "YE"
  },
  {
      "name": "Zambia",
      "code": "ZM"
  },
  {
      "name": "Zimbabwe",
      "code": "ZW"
  }
]

const amit=[{ "postalAddresses": [], "thumbnailPath": "content://com.android.contacts/display_photo/9223372034707292161", "hasThumbnail": true, "note": "", "company": "", "familyName": "Danon", "middleName": null, "rawContactId": "9223372034707292161", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "Amit", "recordID": "9223372034707292161" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "154", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "48", "label": "mobile", "number": "055-6631107" }, { "id": "491", "label": "mobile", "number": "055-6631107" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "עידו", "recordID": "408" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "164", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "64", "label": "mobile", "number": "055-660-6400" }, { "id": "541", "label": "mobile", "number": "0556606400" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "שמואל", "recordID": "160" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "143", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "96", "label": "mobile", "number": "054-581-4636" }, { "id": "436", "label": "mobile", "number": "0545814636" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "תומר", "recordID": "138" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "245", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "124", "label": "mobile", "number": "050-819-2089" }, { "id": "812", "label": "mobile", "number": "0508192089" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "הילה", "recordID": "347" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": "מכינה", "middleName": null, "rawContactId": "160", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "128", "label": "mobile", "number": "+972543149400" }, { "id": "521", "label": "mobile", "number": "+972543149400" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "נדב", "recordID": "205" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "111", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "150", "label": "mobile", "number": "050-9433350" }, { "id": "276", "label": "mobile", "number": "0509433350" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "אמא", "recordID": "116" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "122", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "154", "label": "mobile", "number": "050-7900062" }, { "id": "331", "label": "mobile", "number": "050-7900062" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "אבא", "recordID": "124" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "133", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "156", "label": "mobile", "number": "+972524324891" }, { "id": "386", "label": "mobile", "number": "+972524324891" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "גיא", "recordID": "200" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "166", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "161", "label": "mobile", "number": "+972525778087" }, { "id": "551", "label": "mobile", "number": "+972525778087" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "בלובי", "recordID": "508" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "110", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "165", "label": "mobile", "number": "+972545864228" }, { "id": "271", "label": "mobile", "number": "+972545864228" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "מתן", "recordID": "104" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "127", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "173", "label": "mobile", "number": "+972502076524" }, { "id": "356", "label": "mobile", "number": "+972502076524" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "ליטל", "recordID": "134" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": "מכללה", "middleName": "פלאפון", "rawContactId": "173", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "581", "label": "other", "number": "+972 50-262-0923" }, { "id": "587", "label": "other", "number": "+972502620923" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "בוריס", "recordID": "498" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "240", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "787", "label": "mobile", "number": "+972 52-425-8623" }, { "id": "793", "label": "mobile", "number": "+972524258623" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "רון", "recordID": "419" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "247", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "813", "label": "mobile", "number": "050-234-7607" }, { "id": "819", "label": "mobile", "number": "0502347607" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "יקיר", "recordID": "350" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "277", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "907", "label": "mobile", "number": "+972 54-586-3434" }, { "id": "915", "label": "mobile", "number": "+972545863434" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "רועי", "recordID": "380" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "279", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "916", "label": "mobile", "number": "053-520-4670" }, { "id": "922", "label": "mobile", "number": "0535204670" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "עמיחי", "recordID": "430" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": "Indorz", "middleName": null, "rawContactId": "405", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "1141", "label": "mobile", "number": "050-6304836" }, { "id": "1318", "label": "mobile", "number": "050-6304836" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "ליאור", "recordID": "510" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": "Indorz", "middleName": null, "rawContactId": "364", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "1179", "label": "mobile", "number": "052-344-2121" }, { "id": "1185", "label": "mobile", "number": "0523442121" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "עידו", "recordID": "471" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": "Tcs", "middleName": null, "rawContactId": "368", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "1190", "label": "mobile", "number": "+972 50-230-2345" }, { "id": "1196", "label": "mobile", "number": "+972502302345" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "רותם", "recordID": "478" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": "Indorz", "middleName": null, "rawContactId": "370", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "1197", "label": "mobile", "number": "+972 50-910-7279" }, { "id": "1203", "label": "mobile", "number": "+972509107279" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "אור", "recordID": "479" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": "Indorz", "middleName": null, "rawContactId": "380", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "1226", "label": "mobile", "number": "052-5357383" }, { "id": "1232", "label": "mobile", "number": "052-5357383" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "יותם", "recordID": "485" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": "Indorz", "middleName": null, "rawContactId": "400", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "1298", "label": "mobile", "number": "+972 52-879-7969" }, { "id": "1300", "label": "mobile", "number": "+972 52-879-7969" }, { "id": "1305", "label": "mobile", "number": "+972528797969" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "חן", "recordID": "507" }]
const idoInfo={
    phone: '055-6631107',
    email: 'idodanon@gmail.co',
    password: '12345678',
    confirmPassword: '12345678',   
}
const amitInfo={
    phone: '055-6678224',
    email: 'amit@indorz.co',
    password: '123456789',
    confirmPassword: '123456789',   
}
const googleApiData={
    "html_attributions": [],
    "next_page_token": "CpQCCwEAAOQCQ_JFwO6YKM7hJfnrcwVBlOUePYcc9xroMV7y0mvIV8GXiiiTD_INRJzfHwBwYwuh9wxYi16HEh9AMAsCCSuLiQKPVBAiNSrmRirvM66gi9gsNSBo2SOQgVD2ecwJwYI0k9tNAaJ8HGDmieOEyl3aCDfYntv4N10eXGPju0TxhkIZxEO8jiN5jmqodKNlq6qLAaF0IHjEImTdyhjvtBU_wWwBGxEjEBGJ9OGbIWGbnpZws8aaVt9HBbSqqvZQdcrPeMeXG_a0s2s201hMgiYd7CSn29pd8NHAEGDdKYifK6mKUeSJVuuBHgdLITsk4zlRVh5a0_x_bPChiQof0tivi9XlmM0Q8LdrPD7pVunQEhB3QsSDWBoWGuuMzKKT0juyGhS6rTXrEUr-VcQ6-0pNOP4XISpDjA",
    "results": [
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "Shlomo ha-Melekh St 3-7 Jerusalem Israel",
          "geometry": {
             "location": {
                "lat": 31.7773211,
                "lng": 35.2270905
             },
             "viewport": {
                "northeast": {
                   "lat": 31.77870322989272,
                   "lng": 35.22847122989272
                },
                "southwest": {
                   "lat": 31.77600357010728,
                   "lng": 35.22577157010728
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "45bd198bc0fc21cbc5bae55aa8192c3b873cd97f",
          "name": "Tala Hummus and Falafel",
          "opening_hours": {},
          "photos": [
             {
                "height": 1080,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/103846005022434591763\">Nathalie Steck</a>"
                ],
                "photo_reference": "CmRaAAAAAnjFE_FP1Q5HOBYc8I4-KNApZuQVyxW4IXYpDKq01X_NWf5RIn3l1RnlWuEsszc1I9-ByJ3sBxwfxkgZFgVziRwpEsk4Rgk5oh3kLNNB_M5RTHxe3URN8hc6FA55-KWjEhCFbrTw8eOpFrc_6XHzZpMlGhTdBxzMmqQJNfhAe7NhgauW264LEQ",
                "width": 1616
             }
          ],
          "place_id": "ChIJu9ASE84pAxURZnvavi88IO4",
          "plus_code": {
             "compound_code": "Q6GG+WR Jerusalem",
             "global_code": "8G3QQ6GG+WR"
          },
          "price_level": 2,
          "rating": 4.2,
          "reference": "ChIJu9ASE84pAxURZnvavi88IO4",
          "types": [
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total": 501
       },
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "Beit Ya'akov St 10, Jerusalem, Israel",
          "geometry": {
             "location": {
                "lat": 31.7852311,
                "lng": 35.211156
             },
             "viewport": {
                "northeast": {
                   "lat": 31.78655207989272,
                   "lng": 35.21252452989273
                },
                "southwest": {
                   "lat": 31.78385242010727,
                   "lng": 35.20982487010728
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "daf66ef5454e268bbb63104afc7cf1775da6e899",
          "name": "Machneyuda",
          "opening_hours": {
             "open_now": false
          },
          "photos": [
             {
                "height": 2736,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/107183299189572598045\">Deivi Mashiach</a>"
                ],
                "photo_reference": "CmRaAAAA5mC79A-K1UhTnmUm1juFCenWTwC2mKZdDZeupohRuCtTJcdW2nfDcCsxGjGxxl8iezaZ9Q7P_bJWiqnYsNQ3MYW4RlWcODWZJgchn4ZWAbbUbL1X64HmRcqy-29FEL5zEhD3Zo5qAaYLbq-3a1ZkLcraGhQntaVIAT2wbg98LXpGBmnDFu86WQ",
                "width": 3648
             }
          ],
          "place_id": "ChIJ9ZPR6yjWAhURXAEV2XEL8yw",
          "plus_code": {
             "compound_code": "Q6P6+3F Jerusalem",
             "global_code": "8G3QQ6P6+3F"
          },
          "price_level": 3,
          "rating": 4.5,
          "reference": "ChIJ9ZPR6yjWAhURXAEV2XEL8yw",
          "types": [
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total": 3519
       },
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "Ha-Eshkol St 4, Jerusalem, Israel",
          "geometry": {
             "location": {
                "lat": 31.7850616,
                "lng": 35.2120051
             },
             "viewport": {
                "northeast": {
                   "lat": 31.78629277989272,
                   "lng": 35.21336057989272
                },
                "southwest": {
                   "lat": 31.78359312010728,
                   "lng": 35.21066092010727
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "bf5f83b41f0cb060a60134ff81edb6172cc23aa2",
          "name": "Azura",
          "opening_hours": {
             "open_now": false
          },
          "photos": [
             {
                "height": 3024,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/110011931875163131128\">David Har-Zahav</a>"
                ],
                "photo_reference": "CmRaAAAAFF2TovPDZe2zYmuG2MdKbqTFk1AUFnDE52ZkaRMPqW2wj2MsarwR78FqGNAFXvAOzo5xgEy1djYK1wzasHo8Vh1c-fdFv162pIKlLyy0vtuk1uNxAgtZhHZiAc7v5BSPEhCTC0g1aaWBG_Q7wZfW6zmtGhThu1-AFlh3s3Rq2vtbPoeIStg8ew",
                "width": 4032
             }
          ],
          "place_id": "ChIJ8epn9SjWAhUR6infQ_h30kw",
          "plus_code": {
             "compound_code": "Q6P6+2R Jerusalem",
             "global_code": "8G3QQ6P6+2R"
          },
          "price_level": 2,
          "rating": 4.5,
          "reference": "ChIJ8epn9SjWAhUR6infQ_h30kw",
          "types": [
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total": 2376
       },
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "Shmu'el ha-Nagid St 12, Jerusalem, Israel",
          "geometry": {
             "location": {
                "lat": 31.7799023,
                "lng": 35.2143747
             },
             "viewport": {
                "northeast": {
                   "lat": 31.78121732989272,
                   "lng": 35.21589527989273
                },
                "southwest": {
                   "lat": 31.77851767010728,
                   "lng": 35.21319562010728
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "c2c26b81b70d5a9394f145c419efd44aa7cc2d3b",
          "name": "Mona",
          "opening_hours": {},
          "photos": [
             {
                "height": 3331,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/113322384165554477684\">A Google User</a>"
                ],
                "photo_reference": "CmRaAAAAEJl1Sq_9iXpgerpLdj4csWZk5cfWd0UGABRlLpqN6Xi4WdbDh5zGEosz5oemIq_ct64B2UeFzBsWsKbLkd6LmjHoxRjSyY3Qn1G0y7slzXrpiY0y-oGZcbPiMltJXEy7EhABpUrxgpORMmh8tsCloBCmGhQsWvomIxQj6qD76lAvqk2UsxriKQ",
                "width": 4991
             }
          ],
          "place_id": "ChIJrTQGByrWAhURiZW-WOGw52s",
          "plus_code": {
             "compound_code": "Q6H7+XP Jerusalem",
             "global_code": "8G3QQ6H7+XP"
          },
          "price_level": 3,
          "rating": 4.5,
          "reference": "ChIJrTQGByrWAhURiZW-WOGw52s",
          "types": [
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total": 1219
       },
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "Ben Yehuda St 5, Jerusalem, Israel",
          "geometry": {
             "location": {
                "lat": 31.7815911,
                "lng": 35.2185742
             },
             "viewport": {
                "northeast": {
                   "lat": 31.78278907989272,
                   "lng": 35.21989732989272
                },
                "southwest": {
                   "lat": 31.78008942010728,
                   "lng": 35.21719767010728
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "95ac10ce26b343e2b21b4f2beab7c130272bbd87",
          "name": "Moshiko Falafel",
          "opening_hours": {
             "open_now": false
          },
          "photos": [
             {
                "height": 3024,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/116332804240212673959\">James Bond BMW</a>"
                ],
                "photo_reference": "CmRaAAAAzNxwKVMIwO5XPo9sxqdMFnzguJqQOkrCrOWQf12-w29K7rJgnNNNMmeXP9XhLkDjaINqr-_B7qX83A4X493LnZ9YNm8MehAvJcqsM5k2UUFtIhCjGVvfrHCQfmtx0Rc5EhBiHuLHqL1JNSwIU3TLroduGhQ4t0z_Od8xysQqYPg_Q1eu7vU4UQ",
                "width": 4032
             }
          ],
          "place_id": "ChIJfadDF9YpAxURltRbcgq8IfM",
          "plus_code": {
             "compound_code": "Q6J9+JC Jerusalem",
             "global_code": "8G3QQ6J9+JC"
          },
          "rating": 4.1,
          "reference": "ChIJfadDF9YpAxURltRbcgq8IfM",
          "types": [
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total": 980
       },
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "סמטת פלט 14, Jerusalem",
          "geometry": {
             "location": {
                "lat": 31.7746675,
                "lng": 35.2269809
             },
             "viewport": {
                "northeast": {
                   "lat": 31.77601732989272,
                   "lng": 35.22833072989273
                },
                "southwest": {
                   "lat": 31.77331767010728,
                   "lng": 35.22563107010728
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "898c6f270cb3cc20c7749f4da24774d3e56b3087",
          "name": "The Eucalyptus",
          "opening_hours": {
             "open_now": false
          },
          "photos": [
             {
                "height": 3024,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/112184798010508486846\">Joe Heitzeberg</a>"
                ],
                "photo_reference": "CmRaAAAAZiWmNoHp8kctfhFYfKrRhhw-D8T7M1OD2V-HaRxNcR_Yf68AQE-FtMNMxRgG76epCuWGvfRPcUe82ZaLgrotd1rbVrTxPY-qnieWICdZMTt6LBkdnzb_smesH5NMc6Y1EhCa_AxZCVg4l-MwisnoGU5IGhS9D-eWToBO3v8J-n4xcuBA6M6n2w",
                "width": 4032
             }
          ],
          "place_id": "ChIJdWxij80pAxURsB7W_iQoxu4",
          "plus_code": {
             "compound_code": "Q6FG+VQ Jerusalem",
             "global_code": "8G3QQ6FG+VQ"
          },
          "price_level": 3,
          "rating": 4.5,
          "reference": "ChIJdWxij80pAxURsB7W_iQoxu4",
          "types": [
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total": 903
       },
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "Betsal'el St 10, Jerusalem, Israel",
          "geometry": {
             "location": {
                "lat": 31.7806042,
                "lng": 35.2141992
             },
             "viewport": {
                "northeast": {
                   "lat": 31.78179842989272,
                   "lng": 35.21569327989271
                },
                "southwest": {
                   "lat": 31.77909877010728,
                   "lng": 35.21299362010727
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "7fe8cf1e41f7153530172bccdda61a6c02aadd5d",
          "name": "Menza",
          "opening_hours": {
             "open_now": true
          },
          "photos": [
             {
                "height": 3024,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/103247385191142543667\">David D</a>"
                ],
                "photo_reference": "CmRaAAAASOFIFZ2niimr1zYVQ7jGVpWC5yg8DiIvzlu10rGT2vG21gmiJjR2C15PDJUAzwJe89BF6mXmhHf1x7AJTg1-BhKWt4PPTbZJBmbYev_5MyxvLi1RcYMCcannlAOApQFZEhCi3hNAtcYJKADQaXXzYeT1GhT_G4mZDBRUIZAzeCSgjtv14LQ0Wg",
                "width": 4032
             }
          ],
          "place_id": "ChIJpQpBHSrWAhURst8cYq1z_MA",
          "plus_code": {
             "compound_code": "Q6J7+6M Jerusalem",
             "global_code": "8G3QQ6J7+6M"
          },
          "price_level": 2,
          "rating": 4.3,
          "reference": "ChIJpQpBHSrWAhURst8cYq1z_MA",
          "types": [
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total": 1253
       },
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "Azza St 17, Jerusalem, Israel",
          "geometry": {
             "location": {
                "lat": 31.772861,
                "lng": 35.214781
             },
             "viewport": {
                "northeast": {
                   "lat": 31.77424377989272,
                   "lng": 35.21609327989272
                },
                "southwest": {
                   "lat": 31.77154412010728,
                   "lng": 35.21339362010728
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "826c0aa86b63160ad38de64ad480aee95a09cfb4",
          "name": "Cafe Yehoshua nsu",
          "opening_hours": {
             "open_now": false
          },
          "photos": [
             {
                "height": 2448,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/117123771653117409624\">Yuval Yogev</a>"
                ],
                "photo_reference": "CmRaAAAAHI-rlSPSO4eNlGWGdIfk4xbrfFLxMbFHzgMtRt5ZHc3Czw0XpfRHvKPAE_DsPYan1vgDNn1nEoOlcsN-abxQhy4T1hl9Dhb1zYR-u4Toc55qAWWCjM2TbCiMv-VaeIADEhDpzcrOoFj2eDi4A9gLvlFeGhQf4gLJEsKwhQR_WQWJyOzxz-DLGA",
                "width": 3264
             }
          ],
          "place_id": "ChIJr5mSf9XXAhURAniVJmNna8w",
          "plus_code": {
             "compound_code": "Q6F7+4W Jerusalem",
             "global_code": "8G3QQ6F7+4W"
          },
          "price_level": 2,
          "rating": 4.6,
          "reference": "ChIJr5mSf9XXAhURAniVJmNna8w",
          "types": [
             "restaurant",
             "cafe",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total": 1676
       },
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "King George St 41, Jerusalem, 9426116, Israel",
          "geometry": {
             "location": {
                "lat": 31.778306,
                "lng": 35.216163
             },
             "viewport": {
                "northeast": {
                   "lat": 31.77964752989272,
                   "lng": 35.21740647989273
                },
                "southwest": {
                   "lat": 31.77694787010727,
                   "lng": 35.21470682010728
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "2b470fee63dde69c4e733f56d26248303aea937b",
          "name": "Chakra",
          "opening_hours": {
             "open_now": true
          },
          "photos": [
             {
                "height": 854,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/100587932045615985798\">Chakra</a>"
                ],
                "photo_reference": "CmRaAAAA1Do4UR4v8Zxw267rg5GeTlPe1CbvW3A2oCul0mZSQ4u-Uh2fT6y7jVgSkUeSUFaQdCXmr9Lh2ntqWLQdITsT-641Zg1wo5rRNz1KxuW7gANApf2q24b8SracExVdQcHfEhBQhwGe7IrWeBg_kQ1Mf1WFGhQaToVs-4_cLfAnPGVllDPR2kcV5A",
                "width": 1280
             }
          ],
          "place_id": "ChIJJ8Y3l9UpAxURQz9UzRSfTfM",
          "plus_code": {
             "compound_code": "Q6H8+8F Jerusalem",
             "global_code": "8G3QQ6H8+8F"
          },
          "price_level": 3,
          "rating": 4.5,
          "reference": "ChIJJ8Y3l9UpAxURQz9UzRSfTfM",
          "types": [
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total": 1265
       },
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "Ha-Shikma St 5, Jerusalem, Israel",
          "geometry": {
             "location": {
                "lat": 31.78487479999999,
                "lng": 35.2117466
             },
             "viewport": {
                "northeast": {
                   "lat": 31.78623777989272,
                   "lng": 35.21313007989272
                },
                "southwest": {
                   "lat": 31.78353812010728,
                   "lng": 35.21043042010728
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "0d69af8eb2f528004385509b731fb383663dec13",
          "name": "Hachapuria",
          "opening_hours": {
             "open_now": false
          },
          "photos": [
             {
                "height": 2160,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/109117793611218898730\">Dana Shakirov</a>"
                ],
                "photo_reference": "CmRaAAAALZ1mNxm5sA_8N8_qGrkWap4vzUcdC4cvmx42nW6jZkZ22vhWOxMCFSicidohON_MAI4LmnqXYcMjGsemaI1JBXRP4reZly_CHl6Fvw0K4VE3snZDAFHnqUzcuN2wI_BNEhBZjqKZDx-HmphSMfGDlyAiGhTTj0VzV8fodyyjuEjRgp3og0cD0A",
                "width": 3840
             }
          ],
          "place_id": "ChIJ2yWH8yjWAhUR2Bwm1dCdAig",
          "plus_code": {
             "compound_code": "Q6M6+WM Jerusalem",
             "global_code": "8G3QQ6M6+WM"
          },
          "price_level": 2,
          "rating": 4.5,
          "reference": "ChIJ2yWH8yjWAhUR2Bwm1dCdAig",
          "types": [
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total": 1253
       },
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "Nablus Road No.20 Jerusalem 91190, Jerusalem",
          "geometry": {
             "location": {
                "lat": 31.788202,
                "lng": 35.228805
             },
             "viewport": {
                "northeast": {
                   "lat": 31.78961467989272,
                   "lng": 35.23025527989272
                },
                "southwest": {
                   "lat": 31.78691502010727,
                   "lng": 35.22755562010728
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "6d61ff5a3ba1bef0b9cd19957bad4c0ad2df37c9",
          "name": "St George’s Garden Bistro - Jerusalem",
          "opening_hours": {
             "open_now": true
          },
          "photos": [
             {
                "height": 3120,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/114879379140398080918\">Cláudia Pereira</a>"
                ],
                "photo_reference": "CmRaAAAAVMT0b2RxoFg1p221O7BTuaxyfijtLgBhp7R3H2Xhy_T-9gLjsl-iVem6R8_ug39HyYNqzE9kuxUWvnJHNaGGKMQVz8AhBVv0ACMc1u8R8OOmnBGtYHNPPdWtZhR7rVreEhCyjPIam1Rny0MzuqFMqQhcGhR2ML2SFcFUGOBuzyWGPW2jD4LoWg",
                "width": 4160
             }
          ],
          "place_id": "ChIJM9mlq8MpAxURsTsz2xKX8E4",
          "plus_code": {
             "compound_code": "Q6QH+7G Jerusalem",
             "global_code": "8G3QQ6QH+7G"
          },
          "price_level": 2,
          "rating": 4.5,
          "reference": "ChIJM9mlq8MpAxURsTsz2xKX8E4",
          "types": [
             "cafe",
             "bar",
             "restaurant",
             "food",
             "point_of_interest",
             "store",
             "establishment"
          ],
          "user_ratings_total": 67
       },
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "Keren HaYesod St 36, Jerusalem, Israel",
          "geometry": {
             "location": {
                "lat": 31.7718017,
                "lng": 35.2221412
             },
             "viewport": {
                "northeast": {
                   "lat": 31.77320367989272,
                   "lng": 35.22353137989273
                },
                "southwest": {
                   "lat": 31.77050402010728,
                   "lng": 35.22083172010728
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "6ee4578c1fd0bb0ccf9e74b480969abe470a9c46",
          "name": "Satya",
          "opening_hours": {
             "open_now": true
          },
          "photos": [
             {
                "height": 3024,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/118270127766251526372\">Guy Cohen</a>"
                ],
                "photo_reference": "CmRaAAAAbv1iV1knqeZiuxXBuZAXg8Hf_3CGA9qMbWTskxRG8UQ5rg8fRgpZ_FUuD-lmhexGwl2iVCHW7iekJtgHd8NhTgVk6NKiLm8CrVL8zTBP29taWDcG8w1LFUcOqoSVt7RTEhBmfecgckGSSqTrlwJ-MVjiGhSe-tf5UFAZbLmrJEXfL5xIY7XdnQ",
                "width": 4032
             }
          ],
          "place_id": "ChIJv1BcwiwoAxURdkr9sDDzMA4",
          "plus_code": {
             "compound_code": "Q6CC+PV Jerusalem",
             "global_code": "8G3QQ6CC+PV"
          },
          "price_level": 2,
          "rating": 4.5,
          "reference": "ChIJv1BcwiwoAxURdkr9sDDzMA4",
          "types": [
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total": 835
       },
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "Latin Patriarchate Rd. 26, Jerusalem",
          "geometry": {
             "location": {
                "lat": 31.7772297,
                "lng": 35.2273095
             },
             "viewport": {
                "northeast": {
                   "lat": 31.77858352989272,
                   "lng": 35.22866312989272
                },
                "southwest": {
                   "lat": 31.77588387010728,
                   "lng": 35.22596347010727
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "66258b6fed99410d62ffbfa8e10bc16fe2ec7e97",
          "name": "Nafoura Restaurant",
          "opening_hours": {
             "open_now": true
          },
          "photos": [
             {
                "height": 1960,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/113526621736145375795\">Eduardas Radziukas</a>"
                ],
                "photo_reference": "CmRaAAAABEwRU8RCVbgT6XkaDeHZj7KsuAhhvLguk96Moy9gVp_YeTbi2sPp4I-pMT4NusDo_tS4ed0T4AMry0jB0cVt9kMIg-TMJz4QlIOZAxc_sG6J8NVcMh5hz8iTWs8Up9HdEhA2obRPYY6DRMitzUN_kzxrGhTrBrEioasKZ5yVJPfOobePLCegwQ",
                "width": 4032
             }
          ],
          "place_id": "ChIJJ-WVbM4pAxUR-uACRQT2q18",
          "plus_code": {
             "compound_code": "Q6GG+VW Jerusalem",
             "global_code": "8G3QQ6GG+VW"
          },
          "rating": 4.4,
          "reference": "ChIJJ-WVbM4pAxUR-uACRQT2q18",
          "types": [
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total": 183
       },
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "3 9431803, Etz Hayyim St, Jerusalem, Israel",
          "geometry": {
             "location": {
                "lat": 31.7856281,
                "lng": 35.2127576
             },
             "viewport": {
                "northeast": {
                   "lat": 31.78704807989272,
                   "lng": 35.21407232989272
                },
                "southwest": {
                   "lat": 31.78434842010727,
                   "lng": 35.21137267010727
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "815d29dde5f666f17264ef71b1360d755355c8d2",
          "name": "BeerBazaar Jerusalem",
          "opening_hours": {
             "open_now": false
          },
          "photos": [
             {
                "height": 1067,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/117689920859858956579\">A Google User</a>"
                ],
                "photo_reference": "CmRaAAAACauJ4nU0seAFeQ1P8hz-_IvjOULJhyeGgB1ty3qXaXrHYSa3BAWMWdRgLM1HJIl3geBfxYkh7ts79w9glrjzK49Y-RQWmHN9oL9MyhtJWhjggolZ9fRspAsx5FSZT6DEEhDo1Fhvty7LH62Al3_U9DCeGhQAWQeLA_J0pPKhF9ftgfjcYJdEcw",
                "width": 1600
             }
          ],
          "place_id": "ChIJQVMbeijWAhURX50ZUWMGnuU",
          "plus_code": {
             "compound_code": "Q6P7+74 Jerusalem",
             "global_code": "8G3QQ6P7+74"
          },
          "price_level": 2,
          "rating": 4.5,
          "reference": "ChIJQVMbeijWAhURX50ZUWMGnuU",
          "types": [
             "bar",
             "liquor_store",
             "restaurant",
             "food",
             "point_of_interest",
             "store",
             "establishment"
          ],
          "user_ratings_total": 2664
       },
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "Hillel St 28, Jerusalem, Israel",
          "geometry": {
             "location": {
                "lat": 31.7799354,
                "lng": 35.2188552
             },
             "viewport": {
                "northeast": {
                   "lat": 31.78130312989272,
                   "lng": 35.22021102989272
                },
                "southwest": {
                   "lat": 31.77860347010728,
                   "lng": 35.21751137010727
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "3fead3d9ebfd882069fa95bc386a954809312e3c",
          "name": "Jachnun Bar ג'חנון בר",
          "opening_hours": {
             "open_now": true
          },
          "photos": [
             {
                "height": 4032,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/114037057740445436181\">Zubin Arenja</a>"
                ],
                "photo_reference": "CmRaAAAA8QipF1_h0etuA7xLQ8ikrm9yyf33ZCsL-SbG1tOLP3hPmRRGLmxePej_QKv6_D-nCTEUk1oY3Q95kmuRCtr6lK-V5UXlKMinLZwO6AWT0W7Oixk2cFpj4teJ0QE7ht1YEhD0LP1sIviYJSuNwNQZKUCKGhSl5gtePNQqUa7mKFxFfrpfXvImdw",
                "width": 3024
             }
          ],
          "place_id": "ChIJSY8DltYpAxURI6FPL8XDk94",
          "plus_code": {
             "compound_code": "Q6H9+XG Jerusalem",
             "global_code": "8G3QQ6H9+XG"
          },
          "price_level": 1,
          "rating": 4.5,
          "reference": "ChIJSY8DltYpAxURI6FPL8XDk94",
          "types": [
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total": 627
       },
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "Hagai 174, Jerusalem",
          "geometry": {
             "location": {
                "lat": 31.7772763,
                "lng": 35.233252
             },
             "viewport": {
                "northeast": {
                   "lat": 31.77862612989273,
                   "lng": 35.23460182989272
                },
                "southwest": {
                   "lat": 31.77592647010728,
                   "lng": 35.23190217010728
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "aa5147b949b777ed01f1a2b3133d47deed7966da",
          "name": "Between the Arches Restaurant",
          "opening_hours": {
             "open_now": false
          },
          "photos": [
             {
                "height": 3024,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/107440059412944900224\">maria fernanda girado</a>"
                ],
                "photo_reference": "CmRaAAAAsnbRq5UXm01HC4B4oWQio6KBkal6trZCUlE3tYhlBhgf-ZDJW8BqNm9q1IDPsBSjlNDt9-_EwpiHepD3i68XVVANqOZDhtbf8rhNdgeaVjstPJGb1KvUjeZcBUuk4MNLEhA9v51SkgfWFelWl4qsSbOEGhTE1nPSMmCpbo_SIwUGQ6QDJkSj0g",
                "width": 4032
             }
          ],
          "place_id": "ChIJtau_VMgpAxUR6gB96BmPfPw",
          "plus_code": {
             "compound_code": "Q6GM+W8 Jerusalem",
             "global_code": "8G3QQ6GM+W8"
          },
          "price_level": 2,
          "rating": 4.2,
          "reference": "ChIJtau_VMgpAxUR6gB96BmPfPw",
          "types": [
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total": 357
       },
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "Ben Sira St 3, Jerusalem, 9418103, Israel",
          "geometry": {
             "location": {
                "lat": 31.7792229,
                "lng": 35.221713
             },
             "viewport": {
                "northeast": {
                   "lat": 31.78058657989272,
                   "lng": 35.22295582989273
                },
                "southwest": {
                   "lat": 31.77788692010728,
                   "lng": 35.22025617010728
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "ca3dba49101803d4abbf1ee9cd57620a70a60d53",
          "name": "Ben-Sira Hummus",
          "opening_hours": {
             "open_now": false
          },
          "photos": [
             {
                "height": 2268,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/113314531409456424365\">Ruwen Hess</a>"
                ],
                "photo_reference": "CmRaAAAAbKiTbAOPv4m4q7UcBKzOmXyOH-neRZTHAS9mf7WHmDn8YdUD5O1SqYtJvI5j1HYld-hnEmDQJId0NA4rpvbyNJKbjOV_qAYSTKFxaOQnJpnUysjLLQxJrgD7nGyuRhbcEhDfvq_sskBaUHPbqSbNUcBZGhSP6xASpTEQO4VR7dxsEkOK-Cq2yA",
                "width": 4032
             }
          ],
          "place_id": "ChIJIyRMQNEpAxURtZJ59FrYWVE",
          "plus_code": {
             "compound_code": "Q6HC+MM Jerusalem",
             "global_code": "8G3QQ6HC+MM"
          },
          "price_level": 1,
          "rating": 4.3,
          "reference": "ChIJIyRMQNEpAxURtZJ59FrYWVE",
          "types": [
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total": 2415
       },
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "Tif'eret Israel St 11, Jerusalem",
          "geometry": {
             "location": {
                "lat": 31.7754791,
                "lng": 35.2321032
             },
             "viewport": {
                "northeast": {
                   "lat": 31.77682567989272,
                   "lng": 35.23333882989272
                },
                "southwest": {
                   "lat": 31.77412602010727,
                   "lng": 35.23063917010727
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "6a9c4aba71e8f50caf3882402b5ac3af0d501f22",
          "name": "The Quarter Cafe",
          "photos": [
             {
                "height": 2368,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/110196241500833205186\">Paolo Stefani</a>"
                ],
                "photo_reference": "CmRaAAAADfh_MwzmMWw9tAjnexHGl3L6WdwwL-ByqSPPt_wZR7YvXKfMTsxe3h-P274xCTwIfayre5IlxR-slNoz_dVXdShD3Z_bR8hqGQ3Yv7RPIkEjnnBdoZm2KH9t3ur0Yi9jEhDIzNKCFd0YZW9sPhZUB4LXGhTxUWb3fhYeQ7N5h0iTQSpgRC8OmA",
                "width": 3200
             }
          ],
          "place_id": "ChIJw7NKRckpAxURcnSFTNJyhjY",
          "plus_code": {
             "compound_code": "Q6GJ+5R Jerusalem",
             "global_code": "8G3QQ6GJ+5R"
          },
          "rating": 4.4,
          "reference": "ChIJw7NKRckpAxURcnSFTNJyhjY",
          "types": [
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total": 110
       },
       {
          "business_status": "CLOSED_TEMPORARILY",
          "formatted_address": "Antara Ben Shadad St 15, Jerusalem",
          "geometry": {
             "location": {
                "lat": 31.7842959,
                "lng": 35.2285367
             },
             "viewport": {
                "northeast": {
                   "lat": 31.78558967989272,
                   "lng": 35.22994282989272
                },
                "southwest": {
                   "lat": 31.78289002010728,
                   "lng": 35.22724317010728
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
          "id": "b84c763edc66793101fc0c4ba7e1c8ca0a7ed23e",
          "name": "Jerusalem Hotel",
          "permanently_closed": true,
          "photos": [
             {
                "height": 3024,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/110683857008833141727\">mahashi imasashi</a>"
                ],
                "photo_reference": "CmRaAAAA6ritxlG-c2nYkStcCaCxuBfmeWqrH2Tqqq1aKvhagoO-uBtMj72rOL1E45ciu-pOOQ4OY_ZGfuE5wxOueJV0-oWK6Vl4BbzIynxgHEE48P7xKDsZlrPftB02CxCAV_70EhBRDBhYMj0KcwySpBqsMxr9GhRxn18Eyp6HPhbsysUA5GgTWLuyRg",
                "width": 4032
             }
          ],
          "place_id": "ChIJgzGXWMQpAxURoT_9ilFZa0k",
          "plus_code": {
             "compound_code": "Q6MH+PC Jerusalem",
             "global_code": "8G3QQ6MH+PC"
          },
          "rating": 4.3,
          "reference": "ChIJgzGXWMQpAxURoT_9ilFZa0k",
          "types": [
             "cafe",
             "lodging",
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total": 440
       },
       {
          "business_status": "OPERATIONAL",
          "formatted_address": "4 94582, Rabbi Akiva St, Jerusalem, Israel",
          "geometry": {
             "location": {
                "lat": 31.7797337,
                "lng": 35.2180449
             },
             "viewport": {
                "northeast": {
                   "lat": 31.78108377989273,
                   "lng": 35.21939347989272
                },
                "southwest": {
                   "lat": 31.77838412010728,
                   "lng": 35.21669382010728
                }
             }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "b4f97b5392a45aabe77cdd8796bcbbbda448dc60",
          "name": "Focaccia Bar",
          "opening_hours": {
             "open_now": true
          },
          "photos": [
             {
                "height": 3024,
                "html_attributions": [
                   "<a href=\"https://maps.google.com/maps/contrib/116112781137629305035\">Carlos Berjman</a>"
                ],
                "photo_reference": "CmRaAAAA8fvA1iJoao_eX9UEr3nARWFml-lGncSyxLpoNCFzOz8r9aTR5dT065G-saFehhAqgXFARKi6Aan4dzOhsBUnTp8N70NaHRc6OznA5jyVWxjVx_BQ3e-q65jr621IcmUNEhBnqf4zQ9CaW4UJNezY6K1kGhRTEeoUW4g08DojE993jUKdBw9M_A",
                "width": 4032
             }
          ],
          "place_id": "ChIJkYVFhNYpAxURDSsT4KtgTX0",
          "plus_code": {
             "compound_code": "Q6H9+V6 Jerusalem",
             "global_code": "8G3QQ6H9+V6"
          },
          "price_level": 2,
          "rating": 4,
          "reference": "ChIJkYVFhNYpAxURDSsT4KtgTX0",
          "types": [
             "bar",
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total": 3021
       }
    ],
    "status": "OK"
 };
const ido = [
  {
    postalAddresses: [],
    thumbnailPath:
      'content://com.android.contacts/display_photo/9223372034707292161',
    hasThumbnail: true,
    note: '',
    company: '',
    familyName: 'Danon',
    middleName: null,
    rawContactId: '9223372034707292161',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'Ido',
    recordID: '9223372034707292161',
  },
  {
    postalAddresses: [],
    thumbnailPath: '',
    hasThumbnail: false,
    note: '',
    company: '',
    familyName: null,
    middleName: null,
    rawContactId: '154',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [
      {id: '48', label: 'mobile', number: '055-6678224'},
      {id: '491', label: 'mobile', number: '0556678224'},
    ],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'amit',
    recordID: '408',
  },
];

const mom = [
  {
    postalAddresses: [],
    thumbnailPath:
      'content://com.android.contacts/display_photo/9223372034707292161',
    hasThumbnail: true,
    note: '',
    company: '',
    familyName: 'Danon',
    middleName: null,
    rawContactId: '9223372034707292161',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'Aster',
    recordID: '9223372034707292161',
  },
  {
    postalAddresses: [],
    thumbnailPath: '',
    hasThumbnail: false,
    note: '',
    company: '',
    familyName: null,
    middleName: null,
    rawContactId: '154',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [
      {id: '48', label: 'mobile', number: '055-6678224'},
      {id: '491', label: 'mobile', number: '0556678224'},
    ],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'amit',
    recordID: '408',
  },
];

const yotam = [
  {
    postalAddresses: [],
    thumbnailPath:
      'content://com.android.contacts/display_photo/9223372034707292161',
    hasThumbnail: true,
    note: '',
    company: '',
    familyName: 'Cohen',
    middleName: null,
    rawContactId: '9223372034707292161',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'yotam',
    recordID: '9223372034707292161',
  },
  {
    postalAddresses: [],
    thumbnailPath: '',
    hasThumbnail: false,
    note: '',
    company: '',
    familyName: null,
    middleName: null,
    rawContactId: '154',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [
      {id: '48', label: 'mobile', number: '055-6678224'},
      {id: '491', label: 'mobile', number: '0556678224'},
    ],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'amit danon',
    recordID: '408',
  },
];

const lior = [
  {
    postalAddresses: [],
    thumbnailPath:
      'content://com.android.contacts/display_photo/9223372034707292161',
    hasThumbnail: true,
    note: '',
    company: '',
    familyName: 'ben aharon',
    middleName: null,
    rawContactId: '9223372034707292161',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'lior',
    recordID: '9223372034707292161',
  },
  {
    postalAddresses: [],
    thumbnailPath: '',
    hasThumbnail: false,
    note: '',
    company: '',
    familyName: null,
    middleName: null,
    rawContactId: '154',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [
      {id: '48', label: 'mobile', number: '055-6678224'},
      {id: '491', label: 'mobile', number: '0556678224'},
    ],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'amit work',
    recordID: '408',
  },
];

const dad = [
  {
    postalAddresses: [],
    thumbnailPath:
      'content://com.android.contacts/display_photo/9223372034707292161',
    hasThumbnail: true,
    note: '',
    company: '',
    familyName: 'danon',
    middleName: null,
    rawContactId: '9223372034707292161',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'izik',
    recordID: '9223372034707292161',
  },
  {
    postalAddresses: [],
    thumbnailPath: '',
    hasThumbnail: false,
    note: '',
    company: '',
    familyName: null,
    middleName: null,
    rawContactId: '154',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [
      {id: '48', label: 'mobile', number: '055-6678224'},
      {id: '491', label: 'mobile', number: '0556678224'},
    ],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'amit',
    recordID: '408',
  },
];
const email="amit@indorz.co";

export {categories, explore, products, profile, ido,idoInfo, mom, yotam, lior, dad,countries,amit,email,amitInfo,googleApiData};
