/* scroll */
(function(o, i, k) {
    i.infinitescroll = function z(D, F, E) {
        this.element = i(E);
        if (!this._create(D, F)) {
            this.failed = true
        }
    };
    i.infinitescroll.defaults = {
        loading: {
            finished: k,
            finishedMsg: "<em>Congratulations, you've reached the end of the internet.</em>",
            img: "",
            msg: null,
            msgText: "Loading the next set of posts...",
            selector: null,
            speed: "fast",
            start: k
        },
        state: {
            isDuringAjax: false,
            isInvalidPage: false,
            isDestroyed: false,
            isDone: false,
            isPaused: false,
            currPage: 1
        },
        debug: false,
        behavior: k,
        binder: i(o),
        nextSelector: "div.navigation a:first",
        navSelector: "div.navigation",
        contentSelector: null,
        extraScrollPx: 150,
        itemSelector: "div.post",
        animate: false,
        pathParse: k,
        dataType: "html",
        appendCallback: true,
        bufferPx: 40,
        errorCallback: function() {},
        infid: 0,
        pixelsFromNavToBottom: k,
        path: k,
        prefill: false
    };
    i.infinitescroll.prototype = {
        _binding: function g(F) {
            var D = this,
                E = D.options;
            E.v = "2.0b2.120520";
            if (!!E.behavior && this["_binding_" + E.behavior] !== k) {
                this["_binding_" + E.behavior].call(this);
                return
            }
            if (F !== "bind" && F !== "unbind") {
                this._debug("Binding value  " + F + " not valid");
                return false
            }
            if (F === "unbind") {
                (this.options.binder).unbind("smartscroll.infscr." + D.options.infid)
            } else {
                (this.options.binder)[F]("smartscroll.infscr." + D.options.infid, function() {
                    D.scroll()
                })
            }
            this._debug("Binding", F)
        },
        _create: function t(F, J) {
            var G = i.extend(true, {}, i.infinitescroll.defaults, F);
            this.options = G;
            var I = i(o);
            var D = this;
            if (!D._validate(F)) {
                return false
            }
            var H = i(G.nextSelector).attr("href");
            if (!H) {
                this._debug("Navigation selector not found");
                return false
            }
            G.path = G.path || this._determinepath(H);
            G.contentSelector = G.contentSelector || this.element;
            G.loading.selector = G.loading.selector || G.contentSelector;
            G.loading.msg = G.loading.msg || i('<div id="infscr-loading" class="jl_spinner"><i class="fa fa-circle-o-notch"></i><img alt="Loading..." src="' + G.loading.img + '" /><div>' + G.loading.msgText + "</div></div>");
            (new Image()).src = G.loading.img;
            if (G.pixelsFromNavToBottom === k) {
                G.pixelsFromNavToBottom = i(document).height() - i(G.navSelector).offset().top
            }
            var E = this;
            G.loading.start = G.loading.start || function() {
                i(G.navSelector).hide();
                G.loading.msg.appendTo(G.loading.selector).show(G.loading.speed, i.proxy(function() {
                    this.beginAjax(G)
                }, E))
            };
            G.loading.finished = G.loading.finished || function() {
                G.loading.msg.fadeOut(G.loading.speed)
            };
            G.callback = function(K, L) {
                if (!!G.behavior && K["_callback_" + G.behavior] !== k) {
                    K["_callback_" + G.behavior].call(i(G.contentSelector)[0], L)
                }
                if (J) {
                    J.call(i(G.contentSelector)[0], L, G)
                }
                if (G.prefill) {
                    I.bind("resize.infinite-scroll", K._prefill)
                }
            };
            if (F.debug) {
                if (Function.prototype.bind && (typeof console === "object" || typeof console === "function") && typeof console.log === "object") {
                    ["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"].forEach(function(K) {
                        console[K] = this.call(console[K], console)
                    }, Function.prototype.bind)
                }
            }
            this._setup();
            if (G.prefill) {
                this._prefill()
            }
            return true
        },
        _prefill: function n() {
            var D = this;
            var G = i(document);
            var F = i(o);

            function E() {
                return (G.height() <= F.height())
            }
            this._prefill = function() {
                if (E()) {
                    D.scroll()
                }
                F.bind("resize.infinite-scroll", function() {
                    if (E()) {
                        F.unbind("resize.infinite-scroll");
                        D.scroll()
                    }
                })
            };
            this._prefill()
        },
        _debug: function q() {
            if (true !== this.options.debug) {
                return
            }
            if (typeof console !== "undefined" && typeof console.log === "function") {
                if ((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === "string") {
                    console.log((Array.prototype.slice.call(arguments)).toString())
                } else {
                    console.log(Array.prototype.slice.call(arguments))
                }
            } else {
                if (!Function.prototype.bind && typeof console !== "undefined" && typeof console.log === "object") {
                    Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments))
                }
            }
        },
        _determinepath: function A(E) {
            var D = this.options;
            if (!!D.behavior && this["_determinepath_" + D.behavior] !== k) {
                return this["_determinepath_" + D.behavior].call(this, E)
            }
            if (!!D.pathParse) {
                this._debug("pathParse manual");
                return D.pathParse(E, this.options.state.currPage + 1)
            } else {
                if (E.match(/^(.*?)\b2\b(.*?$)/)) {
                    E = E.match(/^(.*?)\b2\b(.*?$)/).slice(1)
                } else {
                    if (E.match(/^(.*?)2(.*?$)/)) {
                        if (E.match(/^(.*?page=)2(\/.*|$)/)) {
                            E = E.match(/^(.*?page=)2(\/.*|$)/).slice(1);
                            return E
                        }
                        E = E.match(/^(.*?)2(.*?$)/).slice(1)
                    } else {
                        if (E.match(/^(.*?page=)1(\/.*|$)/)) {
                            E = E.match(/^(.*?page=)1(\/.*|$)/).slice(1);
                            return E
                        } else {
                            this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.");
                            D.state.isInvalidPage = true
                        }
                    }
                }
            }
            this._debug("determinePath", E);
            return E
        },
        _error: function v(E) {
            var D = this.options;
            if (!!D.behavior && this["_error_" + D.behavior] !== k) {
                this["_error_" + D.behavior].call(this, E);
                return
            }
            if (E !== "destroy" && E !== "end") {
                E = "unknown"
            }
            this._debug("Error", E);
            if (E === "end") {
                this._showdonemsg()
            }
            D.state.isDone = true;
            D.state.currPage = 1;
            D.state.isPaused = false;
            this._binding("unbind")
        },
        _loadcallback: function c(H, I) {
            var G = this.options,
                K = this.options.callback,
                D = (G.state.isDone) ? "done" : (!G.appendCallback) ? "no-append" : "append",
                J;
            if (!!G.behavior && this["_loadcallback_" + G.behavior] !== k) {
                this["_loadcallback_" + G.behavior].call(this, H, I);
                return
            }
            switch (D) {
                case "done":
                    this._showdonemsg();
                    return false;
                case "no-append":
                    if (G.dataType === "html") {
                        I = "<div>" + I + "</div>";
                        I = i(I).find(G.itemSelector)
                    }
                    break;
                case "append":
                    var F = H.children();
                    if (F.length === 0) {
                        return this._error("end")
                    }
                    J = document.createDocumentFragment();
                    while (H[0].firstChild) {
                        J.appendChild(H[0].firstChild)
                    }
                    this._debug("contentSelector", i(G.contentSelector)[0]);
                    i(G.contentSelector)[0].appendChild(J);
                    I = F.get();
                    break
            }
            G.loading.finished.call(i(G.contentSelector)[0], G);
            if (G.animate) {
                var E = i(o).scrollTop() + i("#infscr-loading").height() + G.extraScrollPx + "px";
                i("html,body").animate({
                    scrollTop: E
                }, 800, function() {
                    G.state.isDuringAjax = false
                })
            }
            if (!G.animate) {
                G.state.isDuringAjax = false
            }
            K(this, I);
            if (G.prefill) {
                this._prefill()
            }
        },
        _nearbottom: function u() {
            var E = this.options,
                D = 0 + i(document).height() - (E.binder.scrollTop()) - i(o).height();
            if (!!E.behavior && this["_nearbottom_" + E.behavior] !== k) {
                return this["_nearbottom_" + E.behavior].call(this)
            }
            this._debug("math:", D, E.pixelsFromNavToBottom);
            return (D - E.bufferPx < E.pixelsFromNavToBottom)
        },
        _pausing: function l(E) {
            var D = this.options;
            if (!!D.behavior && this["_pausing_" + D.behavior] !== k) {
                this["_pausing_" + D.behavior].call(this, E);
                return
            }
            if (E !== "pause" && E !== "resume" && E !== null) {
                this._debug("Invalid argument. Toggling pause value instead")
            }
            E = (E && (E === "pause" || E === "resume")) ? E : "toggle";
            switch (E) {
                case "pause":
                    D.state.isPaused = true;
                    break;
                case "resume":
                    D.state.isPaused = false;
                    break;
                case "toggle":
                    D.state.isPaused = !D.state.isPaused;
                    break
            }
            this._debug("Paused", D.state.isPaused);
            return false
        },
        _setup: function r() {
            var D = this.options;
            if (!!D.behavior && this["_setup_" + D.behavior] !== k) {
                this["_setup_" + D.behavior].call(this);
                return
            }
            this._binding("bind");
            return false
        },
        _showdonemsg: function a() {
            var D = this.options;
            if (!!D.behavior && this["_showdonemsg_" + D.behavior] !== k) {
                this["_showdonemsg_" + D.behavior].call(this);
                return
            }
            D.loading.msg.find("img").hide().parent().find("div").html(D.loading.finishedMsg).animate({
                opacity: 1
            }, 2000, function() {
                i(this).parent().fadeOut(D.loading.speed)
            });
            D.errorCallback.call(i(D.contentSelector)[0], "done")
        },
        _validate: function w(E) {
            for (var D in E) {
                if (D.indexOf && D.indexOf("Selector") > -1 && i(E[D]).length === 0) {
                    this._debug("Your " + D + " found no elements.");
                    return false
                }
            }
            return true
        },
        bind: function p() {
            this._binding("bind")
        },
        destroy: function C() {
            this.options.state.isDestroyed = true;
            return this._error("destroy")
        },
        pause: function e() {
            this._pausing("pause")
        },
        resume: function h() {
            this._pausing("resume")
        },
        beginAjax: function B(G) {
            var E = this,
                I = G.path,
                F, D, K, J;
            G.state.currPage++;
            F = i(G.contentSelector).is("table") ? i("<tbody/>") : i("<div/>");
            D = (typeof I === "function") ? I(G.state.currPage) : I.join(G.state.currPage);
            E._debug("heading into ajax", D);
            K = (G.dataType === "html" || G.dataType === "json") ? G.dataType : "html+callback";
            if (G.appendCallback && G.dataType === "html") {
                K += "+callback"
            }
            switch (K) {
                case "html+callback":
                    E._debug("Using HTML via .load() method");
                    F.load(D + " " + G.itemSelector, k, function H(L) {
                        E._loadcallback(F, L)
                    });
                    break;
                case "html":
                    E._debug("Using " + (K.toUpperCase()) + " via $.ajax() method");
                    i.ajax({
                        url: D,
                        dataType: G.dataType,
                        complete: function H(L, M) {
                            J = (typeof(L.isResolved) !== "undefined") ? (L.isResolved()) : (M === "success" || M === "notmodified");
                            if (J) {
                                E._loadcallback(F, L.responseText)
                            } else {
                                E._error("end")
                            }
                        }
                    });
                    break;
                case "json":
                    E._debug("Using " + (K.toUpperCase()) + " via $.ajax() method");
                    i.ajax({
                        dataType: "json",
                        type: "GET",
                        url: D,
                        success: function(N, O, M) {
                            J = (typeof(M.isResolved) !== "undefined") ? (M.isResolved()) : (O === "success" || O === "notmodified");
                            if (G.appendCallback) {
                                if (G.template !== k) {
                                    var L = G.template(N);
                                    F.append(L);
                                    if (J) {
                                        E._loadcallback(F, L)
                                    } else {
                                        E._error("end")
                                    }
                                } else {
                                    E._debug("template must be defined.");
                                    E._error("end")
                                }
                            } else {
                                if (J) {
                                    E._loadcallback(F, N)
                                } else {
                                    E._error("end")
                                }
                            }
                        },
                        error: function() {
                            E._debug("JSON ajax request failed.");
                            E._error("end")
                        }
                    });
                    break
            }
        },
        retrieve: function b(F) {
            F = F || null;
            var D = this,
                E = D.options;
            if (!!E.behavior && this["retrieve_" + E.behavior] !== k) {
                this["retrieve_" + E.behavior].call(this, F);
                return
            }
            if (E.state.isDestroyed) {
                this._debug("Instance is destroyed");
                return false
            }
            E.state.isDuringAjax = true;
            E.loading.start.call(i(E.contentSelector)[0], E)
        },
        scroll: function f() {
            var D = this.options,
                E = D.state;
            if (!!D.behavior && this["scroll_" + D.behavior] !== k) {
                this["scroll_" + D.behavior].call(this);
                return
            }
            if (E.isDuringAjax || E.isInvalidPage || E.isDone || E.isDestroyed || E.isPaused) {
                return
            }
            if (!this._nearbottom()) {
                return
            }
            this.retrieve()
        },
        toggle: function y() {
            this._pausing()
        },
        unbind: function m() {
            this._binding("unbind")
        },
        update: function j(D) {
            if (i.isPlainObject(D)) {
                this.options = i.extend(true, this.options, D)
            }
        }
    };
    i.fn.infinitescroll = function d(F, G) {
        var E = typeof F;
        switch (E) {
            case "string":
                var D = Array.prototype.slice.call(arguments, 1);
                this.each(function() {
                    var H = i.data(this, "infinitescroll");
                    if (!H) {
                        return false
                    }
                    if (!i.isFunction(H[F]) || F.charAt(0) === "_") {
                        return false
                    }
                    H[F].apply(H, D)
                });
                break;
            case "object":
                this.each(function() {
                    var H = i.data(this, "infinitescroll");
                    if (H) {
                        H.update(F)
                    } else {
                        H = new i.infinitescroll(F, G, this);
                        if (!H.failed) {
                            i.data(this, "infinitescroll", H)
                        }
                    }
                });
                break
        }
        return this
    };
    var x = i.event,
        s;
    x.special.smartscroll = {
        setup: function() {
            i(this).bind("scroll", x.special.smartscroll.handler)
        },
        teardown: function() {
            i(this).unbind("scroll", x.special.smartscroll.handler)
        },
        handler: function(G, D) {
            var F = this,
                E = arguments;
            G.type = "smartscroll";
            if (s) {
                clearTimeout(s)
            }
            s = setTimeout(function() {
                i.event.handle.apply(F, E)
            }, D === "execAsap" ? 0 : 100)
        }
    };
    i.fn.smartscroll = function(D) {
        return D ? this.bind("smartscroll", D) : this.trigger("smartscroll", ["execAsap"])
    }
})(window, jQuery);