

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://flixanity.mobi",
    SEARCH: 'https://api.flixanity.mobi/api/v1/0A6ru35yevokjaqbb3',
    TOKEN_API_EMBED: 'eCNBuxFGpRmFlWjUJjmjguCJI',
    EMBED_URL: 'https://flixanity.mobi/ajax/gonlflhyad.php',
    KEY_SL: '9fc895fbb0b23f1c0fb8e5a5fe02f7b5',
    HEADERS: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    }
};

var Flixanity = function () {
    function Flixanity(props) {
        _classCallCheck(this, Flixanity);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Flixanity, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, dataBody, resultSearch, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                dataBody = {
                                    sl: URL.KEY_SL,
                                    q: stringHelper.convertToSearchQueryString(title)
                                };
                                _context.next = 5;
                                return httpRequest.post(URL.SEARCH, { 'content-type': 'application/json; charset=utf-8' }, JSON.stringify(dataBody));

                            case 5:
                                resultSearch = _context.sent;

                                if (!(resultSearch.data == null)) {
                                    _context.next = 8;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 8:
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context.prev = 11;


                                for (_iterator = resultSearch.data[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    item = _step.value;


                                    if (stringHelper.shallowCompare(item.title, title)) {

                                        if (item.type == 'movie' && type == 'movie' && item.year == year) {

                                            this.state.detailUrl = URL.DOMAIN + item.permalink;
                                        } else if (item.type == 'show' && type == 'tv') {

                                            this.state.detailUrl = '' + URL.DOMAIN + item.permalink + '/season/' + season + '/episode/' + episode;
                                        }
                                    }
                                }

                                _context.next = 19;
                                break;

                            case 15:
                                _context.prev = 15;
                                _context.t0 = _context['catch'](11);
                                _didIteratorError = true;
                                _iteratorError = _context.t0;

                            case 19:
                                _context.prev = 19;
                                _context.prev = 20;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 22:
                                _context.prev = 22;

                                if (!_didIteratorError) {
                                    _context.next = 25;
                                    break;
                                }

                                throw _iteratorError;

                            case 25:
                                return _context.finish(22);

                            case 26:
                                return _context.finish(19);

                            case 27:
                                return _context.abrupt('return');

                            case 28:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[11, 15, 19, 27], [20,, 22, 26]]);
            }));

            function searchDetail() {
                return _ref.apply(this, arguments);
            }

            return searchDetail;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _libs2, httpRequest, cheerio, qs, hosts, type, actionEmbed, htmlDetail, elid, dataBody, resultApi, item, embed;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;

                                if (this.state.detailUrl) {
                                    _context2.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                // console.log(this.state.detailUrl);

                                hosts = [];
                                type = this.movieInfo.type;
                                actionEmbed = type == 'movie' ? 'getMovieEmb' : 'getEpisodeEmb';
                                _context2.next = 8;
                                return httpRequest.get(this.state.detailUrl, URL.HEADERS);

                            case 8:
                                htmlDetail = _context2.sent;
                                elid = htmlDetail.data.match(/elid *= *\"([^"]*)/);

                                elid = elid != null ? elid[1] : false;

                                if (!(elid != false)) {
                                    _context2.next = 19;
                                    break;
                                }

                                dataBody = {
                                    action: actionEmbed,
                                    idEl: elid,
                                    token: URL.TOKEN_API_EMBED,
                                    nopop: ''
                                };
                                // let resultApi = await httpRequest.postCloudflare(URL.EMBED_URL, {}, dataBody);

                                _context2.next = 15;
                                return httpRequest.post(URL.EMBED_URL, {
                                    'accept': 'application/json, text/javascript, */*; q=0.01',
                                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                }, qs.stringify(dataBody));

                            case 15:
                                resultApi = _context2.sent;

                                if (!(resultApi.data == 'Invalid request, your IP have been reported!')) {
                                    _context2.next = 18;
                                    break;
                                }

                                throw new Error('NOT LINK');

                            case 18:

                                for (item in resultApi.data) {
                                    embed = resultApi.data[item].embed.match(/src="([^"]*)/i);

                                    embed = embed != null ? embed[1] : false;

                                    embed && hosts.push({
                                        provider: {
                                            url: this.state.detailUrl,
                                            name: "flixanity"
                                        },
                                        result: {
                                            file: embed,
                                            label: "embed",
                                            type: this.isEmbed(embed) ? "embed" : 'direct'
                                        }
                                    });
                                }

                            case 19:

                                this.state.hosts = hosts;

                            case 20:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }, {
        key: 'isEmbed',
        value: function isEmbed(link) {

            if (link.indexOf('statics2.vidcdn.pro') != -1) {
                return false;
            } else if (link.indexOf('stream2.m4ukido.com') != -1) {
                return false;
            }

            return true;
        }
    }]);

    return Flixanity;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var flixanity;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        flixanity = new Flixanity({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context3.next = 3;
                        return flixanity.searchDetail();

                    case 3:
                        _context3.next = 5;
                        return flixanity.getHostFromDetail();

                    case 5:
                        return _context3.abrupt('return', flixanity.state.hosts);

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
    };
}();

thisSource.testing = Flixanity;