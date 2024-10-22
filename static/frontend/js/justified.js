/* Justified */ ! function(t) {
    function i() {
        return t("body").height() > t(window).height()
    }
    var e = function(i, e) {
        this.settings = e, this.checkSettings(), this.imgAnalyzerTimeout = null, this.entries = null, this.buildingRow = {
            entriesBuff: [],
            width: 0,
            height: 0,
            aspectRatio: 0
        }, this.lastFetchedEntry = null, this.lastAnalyzedIndex = -1, this["yield"] = {
            every: 2,
            flushed: 0
        }, this.border = e.border >= 0 ? e.border : e.margins, this.maxRowHeight = this.retrieveMaxRowHeight(), this.suffixRanges = this.retrieveSuffixRanges(), this.offY = this.border, this.rows = 0, this.spinner = {
            phase: 0,
            timeSlot: 150,
            $el: t('<div class="spinner"><span></span><span></span><span></span></div>'),
            intervalId: null
        }, this.checkWidthIntervalId = null, this.galleryWidth = i.width(), this.$gallery = i
    };
    e.prototype.getSuffix = function(t, i) {
        var e, s;
        for (e = t > i ? t : i, s = 0; s < this.suffixRanges.length; s++)
            if (e <= this.suffixRanges[s]) return this.settings.sizeRangeSuffixes[this.suffixRanges[s]];
        return this.settings.sizeRangeSuffixes[this.suffixRanges[s - 1]]
    }, e.prototype.removeSuffix = function(t, i) {
        return t.substring(0, t.length - i.length)
    }, e.prototype.endsWith = function(t, i) {
        return -1 !== t.indexOf(i, t.length - i.length)
    }, e.prototype.getUsedSuffix = function(t) {
        for (var i in this.settings.sizeRangeSuffixes)
            if (this.settings.sizeRangeSuffixes.hasOwnProperty(i)) {
                if (0 === this.settings.sizeRangeSuffixes[i].length) continue;
                if (this.endsWith(t, this.settings.sizeRangeSuffixes[i])) return this.settings.sizeRangeSuffixes[i]
            }
        return ""
    }, e.prototype.newSrc = function(t, i, e, s) {
        var n;
        if (this.settings.thumbnailPath) n = this.settings.thumbnailPath(t, i, e, s);
        else {
            var r = t.match(this.settings.extension),
                a = null !== r ? r[0] : "";
            n = t.replace(this.settings.extension, ""), n = this.removeSuffix(n, this.getUsedSuffix(n)), n += this.getSuffix(i, e) + a
        }
        return n
    }, e.prototype.showImg = function(t, i) {
        this.settings.cssAnimation ? (t.addClass("entry-visible"), i && i()) : (t.stop().fadeTo(this.settings.imagesAnimationDuration, 1, i), t.find("> img, > a > img").stop().fadeTo(this.settings.imagesAnimationDuration, 1, i))
    }, e.prototype.extractImgSrcFromImage = function(t) {
        var i = "undefined" != typeof t.data("safe-src") ? t.data("safe-src") : t.attr("src");
        return t.data("jg.originalSrc", i), i
    }, e.prototype.imgFromEntry = function(t) {
        var i = t.find("> img");
        return 0 === i.length && (i = t.find("> a > img")), 0 === i.length ? null : i
    }, e.prototype.captionFromEntry = function(t) {
        var i = t.find("> .caption");
        return 0 === i.length ? null : i
    }, e.prototype.displayEntry = function(i, e, s, n, r, a) {
        i.width(n), i.height(a), i.css("top", s), i.css("left", e);
        var o = this.imgFromEntry(i);
        if (null !== o) {
            o.css("width", n), o.css("height", r), o.css("margin-left", -n / 2), o.css("margin-top", -r / 2);
            var h = o.attr("src"),
                g = this.newSrc(h, n, r, o[0]);
            o.one("error", function() {
                o.attr("src", o.data("jg.originalSrc"))
            });
            var l = function() {
                h !== g && o.attr("src", g)
            };
            "skipped" === i.data("jg.loaded") ? this.onImageEvent(h, t.proxy(function() {
                this.showImg(i, l), i.data("jg.loaded", !0)
            }, this)) : this.showImg(i, l)
        } else this.showImg(i);
        this.displayEntryCaption(i)
    }, e.prototype.displayEntryCaption = function(i) {
        var e = this.imgFromEntry(i);
        if (null !== e && this.settings.captions) {
            var s = this.captionFromEntry(i);
            if (null === s) {
                var n = e.attr("alt");
                this.isValidCaption(n) || (n = i.attr("title")), this.isValidCaption(n) && (s = t('<div class="caption">' + n + "</div>"), i.append(s), i.data("jg.createdCaption", !0))
            }
            null !== s && (this.settings.cssAnimation || s.stop().fadeTo(0, this.settings.captionSettings.nonVisibleOpacity), this.addCaptionEventsHandlers(i))
        } else this.removeCaptionEventsHandlers(i)
    }, e.prototype.isValidCaption = function(t) {
        return "undefined" != typeof t && t.length > 0
    }, e.prototype.onEntryMouseEnterForCaption = function(i) {
        var e = this.captionFromEntry(t(i.currentTarget));
        this.settings.cssAnimation ? e.addClass("caption-visible").removeClass("caption-hidden") : e.stop().fadeTo(this.settings.captionSettings.animationDuration, this.settings.captionSettings.visibleOpacity)
    }, e.prototype.onEntryMouseLeaveForCaption = function(i) {
        var e = this.captionFromEntry(t(i.currentTarget));
        this.settings.cssAnimation ? e.removeClass("caption-visible").removeClass("caption-hidden") : e.stop().fadeTo(this.settings.captionSettings.animationDuration, this.settings.captionSettings.nonVisibleOpacity)
    }, e.prototype.addCaptionEventsHandlers = function(i) {
        var e = i.data("jg.captionMouseEvents");
        "undefined" == typeof e && (e = {
            mouseenter: t.proxy(this.onEntryMouseEnterForCaption, this),
            mouseleave: t.proxy(this.onEntryMouseLeaveForCaption, this)
        }, i.on("mouseenter", void 0, void 0, e.mouseenter), i.on("mouseleave", void 0, void 0, e.mouseleave), i.data("jg.captionMouseEvents", e))
    }, e.prototype.removeCaptionEventsHandlers = function(t) {
        var i = t.data("jg.captionMouseEvents");
        "undefined" != typeof i && (t.off("mouseenter", void 0, i.mouseenter), t.off("mouseleave", void 0, i.mouseleave), t.removeData("jg.captionMouseEvents"))
    }, e.prototype.prepareBuildingRow = function(t) {
        var i, e, s, n, r, a = !0,
            o = 0,
            h = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
            g = h / this.buildingRow.aspectRatio,
            l = this.settings.rowHeight,
            d = this.buildingRow.width / h > this.settings.justifyThreshold;
        if (t && "hide" === this.settings.lastRow && !d) {
            for (i = 0; i < this.buildingRow.entriesBuff.length; i++) e = this.buildingRow.entriesBuff[i], this.settings.cssAnimation ? e.removeClass("entry-visible") : (e.stop().fadeTo(0, .1), e.find("> img, > a > img").fadeTo(0, 0));
            return -1
        }
        for (t && !d && "justify" !== this.settings.lastRow && "hide" !== this.settings.lastRow && (a = !1, this.rows > 0 && (l = (this.offY - this.border - this.settings.margins * this.rows) / this.rows, a = l * this.buildingRow.aspectRatio / h > this.settings.justifyThreshold)), i = 0; i < this.buildingRow.entriesBuff.length; i++) e = this.buildingRow.entriesBuff[i], s = e.data("jg.width") / e.data("jg.height"), a ? (n = i === this.buildingRow.entriesBuff.length - 1 ? h : g * s, r = g) : (n = l * s, r = l), h -= Math.round(n), e.data("jg.jwidth", Math.round(n)), e.data("jg.jheight", Math.ceil(r)), (0 === i || o > r) && (o = r);
        return this.buildingRow.height = o, a
    }, e.prototype.clearBuildingRow = function() {
        this.buildingRow.entriesBuff = [], this.buildingRow.aspectRatio = 0, this.buildingRow.width = 0
    }, e.prototype.flushRow = function(t) {
        var i, e, s, n = this.settings,
            r = this.border;
        if (e = this.prepareBuildingRow(t), t && "hide" === n.lastRow && -1 === e) return void this.clearBuildingRow();
        if (this.maxRowHeight && (this.maxRowHeight.isPercentage && this.maxRowHeight.value * n.rowHeight < this.buildingRow.height ? this.buildingRow.height = this.maxRowHeight.value * n.rowHeight : this.maxRowHeight.value >= n.rowHeight && this.maxRowHeight.value < this.buildingRow.height && (this.buildingRow.height = this.maxRowHeight.value)), "center" === n.lastRow || "right" === n.lastRow) {
            var a = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * n.margins;
            for (s = 0; s < this.buildingRow.entriesBuff.length; s++) i = this.buildingRow.entriesBuff[s], a -= i.data("jg.jwidth");
            "center" === n.lastRow ? r += a / 2 : "right" === n.lastRow && (r += a)
        }
        for (s = 0; s < this.buildingRow.entriesBuff.length; s++) i = this.buildingRow.entriesBuff[s], this.displayEntry(i, r, this.offY, i.data("jg.jwidth"), i.data("jg.jheight"), this.buildingRow.height), r += i.data("jg.jwidth") + n.margins;
        this.galleryHeightToSet = this.offY + this.buildingRow.height + this.border, this.$gallery.height(this.galleryHeightToSet + this.getSpinnerHeight()), (!t || this.buildingRow.height <= n.rowHeight && e) && (this.offY += this.buildingRow.height + n.margins, this.rows += 1, this.clearBuildingRow(), this.$gallery.trigger("jg.rowflush"))
    };
    var s = !1;
    e.prototype.checkWidth = function() {
        this.checkWidthIntervalId = setInterval(t.proxy(function() {
            var t = parseFloat(this.$gallery.width());
            i() === s ? Math.abs(t - this.galleryWidth) > this.settings.refreshSensitivity && (this.galleryWidth = t, this.rewind(), this.startImgAnalyzer(!0)) : (s = i(), this.galleryWidth = t)
        }, this), this.settings.refreshTime)
    }, e.prototype.isSpinnerActive = function() {
        return null !== this.spinner.intervalId
    }, e.prototype.getSpinnerHeight = function() {
        return this.spinner.$el.innerHeight()
    }, e.prototype.stopLoadingSpinnerAnimation = function() {
        clearInterval(this.spinner.intervalId), this.spinner.intervalId = null, this.$gallery.height(this.$gallery.height() - this.getSpinnerHeight()), this.spinner.$el.detach()
    }, e.prototype.startLoadingSpinnerAnimation = function() {
        var t = this.spinner,
            i = t.$el.find("span");
        clearInterval(t.intervalId), this.$gallery.append(t.$el), this.$gallery.height(this.offY + this.buildingRow.height + this.getSpinnerHeight()), t.intervalId = setInterval(function() {
            t.phase < i.length ? i.eq(t.phase).fadeTo(t.timeSlot, 1) : i.eq(t.phase - i.length).fadeTo(t.timeSlot, 0), t.phase = (t.phase + 1) % (2 * i.length)
        }, t.timeSlot)
    }, e.prototype.rewind = function() {
        this.lastFetchedEntry = null, this.lastAnalyzedIndex = -1, this.offY = this.border, this.rows = 0, this.clearBuildingRow()
    }, e.prototype.updateEntries = function(i) {
        var e;
        return i && null != this.lastFetchedEntry ? e = t(this.lastFetchedEntry).nextAll(this.settings.selector).toArray() : (this.entries = [], e = this.$gallery.children(this.settings.selector).toArray()), e.length > 0 && (t.isFunction(this.settings.sort) ? e = this.sortArray(e) : this.settings.randomize && (e = this.shuffleArray(e)), this.lastFetchedEntry = e[e.length - 1], this.settings.filter ? e = this.filterArray(e) : this.resetFilters(e)), this.entries = this.entries.concat(e), !0
    }, e.prototype.insertToGallery = function(i) {
        var e = this;
        t.each(i, function() {
            t(this).appendTo(e.$gallery)
        })
    }, e.prototype.shuffleArray = function(t) {
        var i, e, s;
        for (i = t.length - 1; i > 0; i--) e = Math.floor(Math.random() * (i + 1)), s = t[i], t[i] = t[e], t[e] = s;
        return this.insertToGallery(t), t
    }, e.prototype.sortArray = function(t) {
        return t.sort(this.settings.sort), this.insertToGallery(t), t
    }, e.prototype.resetFilters = function(i) {
        for (var e = 0; e < i.length; e++) t(i[e]).removeClass("jg-filtered")
    }, e.prototype.filterArray = function(i) {
        var e = this.settings;
        if ("string" === t.type(e.filter)) return i.filter(function(i) {
            var s = t(i);
            return s.is(e.filter) ? (s.removeClass("jg-filtered"), !0) : (s.addClass("jg-filtered").removeClass("jg-visible"), !1)
        });
        if (t.isFunction(e.filter)) {
            for (var s = i.filter(e.filter), n = 0; n < i.length; n++) - 1 == s.indexOf(i[n]) ? t(i[n]).addClass("jg-filtered").removeClass("jg-visible") : t(i[n]).removeClass("jg-filtered");
            return s
        }
    }, e.prototype.destroy = function() {
        clearInterval(this.checkWidthIntervalId), t.each(this.entries, t.proxy(function(i, e) {
            var s = t(e);
            s.css("width", ""), s.css("height", ""), s.css("top", ""), s.css("left", ""), s.data("jg.loaded", void 0), s.removeClass("jg-entry");
            var n = this.imgFromEntry(s);
            n.css("width", ""), n.css("height", ""), n.css("margin-left", ""), n.css("margin-top", ""), n.attr("src", n.data("jg.originalSrc")), n.data("jg.originalSrc", void 0), this.removeCaptionEventsHandlers(s);
            var r = this.captionFromEntry(s);
            s.data("jg.createdCaption") ? (s.data("jg.createdCaption", void 0), null !== r && r.remove()) : null !== r && r.fadeTo(0, 1)
        }, this)), this.$gallery.css("height", ""), this.$gallery.removeClass("justified-gallery"), this.$gallery.data("jg.controller", void 0)
    }, e.prototype.analyzeImages = function(i) {
        for (var e = this.lastAnalyzedIndex + 1; e < this.entries.length; e++) {
            var s = t(this.entries[e]);
            if (s.data("jg.loaded") === !0 || "skipped" === s.data("jg.loaded")) {
                var n = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
                    r = s.data("jg.width") / s.data("jg.height");
                if (n / (this.buildingRow.aspectRatio + r) < this.settings.rowHeight && (this.flushRow(!1), ++this["yield"].flushed >= this["yield"].every)) return void this.startImgAnalyzer(i);
                this.buildingRow.entriesBuff.push(s), this.buildingRow.aspectRatio += r, this.buildingRow.width += r * this.settings.rowHeight, this.lastAnalyzedIndex = e
            } else if ("error" !== s.data("jg.loaded")) return
        }
        this.buildingRow.entriesBuff.length > 0 && this.flushRow(!0), this.isSpinnerActive() && this.stopLoadingSpinnerAnimation(), this.stopImgAnalyzerStarter(), this.$gallery.trigger(i ? "jg.resize" : "jg.complete"), this.$gallery.height(this.galleryHeightToSet)
    }, e.prototype.stopImgAnalyzerStarter = function() {
        this["yield"].flushed = 0, null !== this.imgAnalyzerTimeout && clearTimeout(this.imgAnalyzerTimeout)
    }, e.prototype.startImgAnalyzer = function(t) {
        var i = this;
        this.stopImgAnalyzerStarter(), this.imgAnalyzerTimeout = setTimeout(function() {
            i.analyzeImages(t)
        }, .001)
    }, e.prototype.onImageEvent = function(i, e, s) {
        if (e || s) {
            var n = new Image,
                r = t(n);
            e && r.one("load", function() {
                r.off("load error"), e(n)
            }), s && r.one("error", function() {
                r.off("load error"), s(n)
            }), n.src = i
        }
    }, e.prototype.init = function() {
        var i = !1,
            e = !1,
            s = this;
        t.each(this.entries, function(n, r) {
            var a = t(r),
                o = s.imgFromEntry(a);
            if (a.addClass("jg-entry"), a.data("jg.loaded") !== !0 && "skipped" !== a.data("jg.loaded"))
                if (null !== s.settings.rel && a.attr("rel", s.settings.rel), null !== s.settings.target && a.attr("target", s.settings.target), null !== o) {
                    var h = s.extractImgSrcFromImage(o);
                    if (o.attr("src", h), s.settings.waitThumbnailsLoad === !1) {
                        var g = parseFloat(o.attr("width")),
                            l = parseFloat(o.attr("height"));
                        if (!isNaN(g) && !isNaN(l)) return a.data("jg.width", g), a.data("jg.height", l), a.data("jg.loaded", "skipped"), e = !0, s.startImgAnalyzer(!1), !0
                    }
                    a.data("jg.loaded", !1), i = !0, s.isSpinnerActive() || s.startLoadingSpinnerAnimation(), s.onImageEvent(h, function(t) {
                        a.data("jg.width", t.width), a.data("jg.height", t.height), a.data("jg.loaded", !0), s.startImgAnalyzer(!1)
                    }, function() {
                        a.data("jg.loaded", "error"), s.startImgAnalyzer(!1)
                    })
                } else a.data("jg.loaded", !0), a.data("jg.width", a.width() | parseFloat(a.css("width")) | 1), a.data("jg.height", a.height() | parseFloat(a.css("height")) | 1)
        }), i || e || this.startImgAnalyzer(!1), this.checkWidth()
    }, e.prototype.checkOrConvertNumber = function(i, e) {
        if ("string" === t.type(i[e]) && (i[e] = parseFloat(i[e])), "number" !== t.type(i[e])) throw e + " must be a number";
        if (isNaN(i[e])) throw "invalid number for " + e
    }, e.prototype.checkSizeRangesSuffixes = function() {
        if ("object" !== t.type(this.settings.sizeRangeSuffixes)) throw "sizeRangeSuffixes must be defined and must be an object";
        var i = [];
        for (var e in this.settings.sizeRangeSuffixes) this.settings.sizeRangeSuffixes.hasOwnProperty(e) && i.push(e);
        for (var s = {
                0: ""
            }, n = 0; n < i.length; n++)
            if ("string" === t.type(i[n])) try {
                var r = parseInt(i[n].replace(/^[a-z]+/, ""), 10);
                s[r] = this.settings.sizeRangeSuffixes[i[n]]
            } catch (a) {
                throw "sizeRangeSuffixes keys must contains correct numbers (" + a + ")"
            } else s[i[n]] = this.settings.sizeRangeSuffixes[i[n]];
        this.settings.sizeRangeSuffixes = s
    }, e.prototype.retrieveMaxRowHeight = function() {
        var i = {};
        if ("string" === t.type(this.settings.maxRowHeight)) this.settings.maxRowHeight.match(/^[0-9]+%$/) ? (i.value = parseFloat(this.settings.maxRowHeight.match(/^([0-9]+)%$/)[1]) / 100, i.isPercentage = !1) : (i.value = parseFloat(this.settings.maxRowHeight), i.isPercentage = !0);
        else {
            if ("number" !== t.type(this.settings.maxRowHeight)) {
                if (this.settings.maxRowHeight === !1 || null === this.settings.maxRowHeight || "undefined" == typeof this.settings.maxRowHeight) return null;
                throw "maxRowHeight must be a number or a percentage"
            }
            i.value = this.settings.maxRowHeight, i.isPercentage = !1
        }
        if (isNaN(i.value)) throw "invalid number for maxRowHeight";
        return i.isPercentage && i.value < 100 && (i.value = 100), i
    }, e.prototype.checkSettings = function() {
        this.checkSizeRangesSuffixes(), this.checkOrConvertNumber(this.settings, "rowHeight"), this.checkOrConvertNumber(this.settings, "margins"), this.checkOrConvertNumber(this.settings, "border");
        var i = ["justify", "nojustify", "left", "center", "right", "hide"];
        if (-1 === i.indexOf(this.settings.lastRow)) throw "lastRow must be one of: " + i.join(", ");
        if (this.checkOrConvertNumber(this.settings, "justifyThreshold"), this.settings.justifyThreshold < 0 || this.settings.justifyThreshold > 1) throw "justifyThreshold must be in the interval [0,1]";
        if ("boolean" !== t.type(this.settings.cssAnimation)) throw "cssAnimation must be a boolean";
        if ("boolean" !== t.type(this.settings.captions)) throw "captions must be a boolean";
        if (this.checkOrConvertNumber(this.settings.captionSettings, "animationDuration"), this.checkOrConvertNumber(this.settings.captionSettings, "visibleOpacity"), this.settings.captionSettings.visibleOpacity < 0 || this.settings.captionSettings.visibleOpacity > 1) throw "captionSettings.visibleOpacity must be in the interval [0, 1]";
        if (this.checkOrConvertNumber(this.settings.captionSettings, "nonVisibleOpacity"), this.settings.captionSettings.nonVisibleOpacity < 0 || this.settings.captionSettings.nonVisibleOpacity > 1) throw "captionSettings.nonVisibleOpacity must be in the interval [0, 1]";
        if (this.checkOrConvertNumber(this.settings, "imagesAnimationDuration"), this.checkOrConvertNumber(this.settings, "refreshTime"), this.checkOrConvertNumber(this.settings, "refreshSensitivity"), "boolean" !== t.type(this.settings.randomize)) throw "randomize must be a boolean";
        if ("string" !== t.type(this.settings.selector)) throw "selector must be a string";
        if (this.settings.sort !== !1 && !t.isFunction(this.settings.sort)) throw "sort must be false or a comparison function";
        if (this.settings.filter !== !1 && !t.isFunction(this.settings.filter) && "string" !== t.type(this.settings.filter)) throw "filter must be false, a string or a filter function"
    }, e.prototype.retrieveSuffixRanges = function() {
        var t = [];
        for (var i in this.settings.sizeRangeSuffixes) this.settings.sizeRangeSuffixes.hasOwnProperty(i) && t.push(parseInt(i, 10));
        return t.sort(function(t, i) {
            return t > i ? 1 : i > t ? -1 : 0
        }), t
    }, e.prototype.updateSettings = function(i) {
        this.settings = t.extend({}, this.settings, i), this.checkSettings(), this.border = this.settings.border >= 0 ? this.settings.border : this.settings.margins, this.maxRowHeight = this.retrieveMaxRowHeight(), this.suffixRanges = this.retrieveSuffixRanges()
    }, t.fn.justifiedGallery = function(i) {
        return this.each(function(s, n) {
            var r = t(n);
            r.addClass("justified-gallery");
            var a = r.data("jg.controller");
            if ("undefined" == typeof a) {
                if ("undefined" != typeof i && null !== i && "object" !== t.type(i)) {
                    if ("destroy" === i) return;
                    throw "The argument must be an object"
                }
                a = new e(r, t.extend({}, t.fn.justifiedGallery.defaults, i)), r.data("jg.controller", a)
            } else if ("norewind" === i);
            else {
                if ("destroy" === i) return void a.destroy();
                a.updateSettings(i), a.rewind()
            }
            a.updateEntries("norewind" === i) && a.init()
        })
    }, t.fn.justifiedGallery.defaults = {
        sizeRangeSuffixes: {},
        thumbnailPath: void 0,
        rowHeight: 120,
        maxRowHeight: !1,
        margins: 1,
        border: -1,
        lastRow: "nojustify",
        justifyThreshold: .9,
        waitThumbnailsLoad: !0,
        captions: !0,
        cssAnimation: !0,
        imagesAnimationDuration: 500,
        captionSettings: {
            animationDuration: 500,
            visibleOpacity: .7,
            nonVisibleOpacity: 0
        },
        rel: null,
        target: null,
        extension: /\.[^.\\/]+$/,
        refreshTime: 200,
        refreshSensitivity: 0,
        randomize: !1,
        sort: !1,
        filter: !1,
        selector: "a, div:not(.spinner)"
    }
}(jQuery);
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(a) {
    var b, c, d, e, f, g, h = "Close",
        i = "BeforeClose",
        j = "AfterClose",
        k = "BeforeAppend",
        l = "MarkupParse",
        m = "Open",
        n = "Change",
        o = "mfp",
        p = "." + o,
        q = "mfp-ready",
        r = "mfp-removing",
        s = "mfp-prevent-close",
        t = function() {},
        u = !!window.jQuery,
        v = a(window),
        w = function(a, c) {
            b.ev.on(o + a + p, c)
        },
        x = function(b, c, d, e) {
            var f = document.createElement("div");
            return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
        },
        y = function(c, d) {
            b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]))
        },
        z = function(c) {
            return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), g = c), b.currTemplate.closeBtn
        },
        A = function() {
            a.magnificPopup.instance || (b = new t, b.init(), a.magnificPopup.instance = b)
        },
        B = function() {
            var a = document.createElement("p").style,
                b = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== a.transition) return !0;
            for (; b.length;)
                if (b.pop() + "Transition" in a) return !0;
            return !1
        };
    t.prototype = {
        constructor: t,
        init: function() {
            var c = navigator.appVersion;
            b.isLowIE = b.isIE8 = document.all && !document.addEventListener, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document), b.popupsCache = {}
        },
        open: function(c) {
            var e;
            if (c.isObj === !1) {
                b.items = c.items.toArray(), b.index = 0;
                var g, h = c.items;
                for (e = 0; e < h.length; e++)
                    if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) {
                        b.index = e;
                        break
                    }
            } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;
            if (b.isOpen) return void b.updateItemHTML();
            b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function() {
                b.close()
            }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function(a) {
                b._checkIfClose(a.target) && b.close()
            }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
            var i = a.magnificPopup.modules;
            for (e = 0; e < i.length; e++) {
                var j = i[e];
                j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b)
            }
            y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function(a, b, c, d) {
                c.close_replaceWith = z(d.type)
            }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({
                overflow: b.st.overflowY,
                overflowX: "hidden",
                overflowY: b.st.overflowY
            }) : b.wrap.css({
                top: v.scrollTop(),
                position: "absolute"
            }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
                height: d.height(),
                position: "absolute"
            }), b.st.enableEscapeKey && d.on("keyup" + p, function(a) {
                27 === a.keyCode && b.close()
            }), v.on("resize" + p, function() {
                b.updateSize()
            }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f);
            var k = b.wH = v.height(),
                n = {};
            if (b.fixedContentPos && b._hasScrollBar(k)) {
                var o = b._getScrollbarSize();
                o && (n.marginRight = o)
            }
            b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
            var r = b.st.mainClass;
            return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(), y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)), b._lastFocusedEl = document.activeElement, setTimeout(function() {
                b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn)
            }, 16), b.isOpen = !0, b.updateSize(k), y(m), c
        },
        close: function() {
            b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r), setTimeout(function() {
                b._close()
            }, b.st.removalDelay)) : b._close())
        },
        _close: function() {
            y(h);
            var c = r + " " + q + " ";
            if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
                var e = {
                    marginRight: ""
                };
                b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
            }
            d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j)
        },
        updateSize: function(a) {
            if (b.isIOS) {
                var c = document.documentElement.clientWidth / window.innerWidth,
                    d = window.innerHeight * c;
                b.wrap.css("height", d), b.wH = d
            } else b.wH = a || v.height();
            b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize")
        },
        updateItemHTML: function() {
            var c = b.items[b.index];
            b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
            var d = c.type;
            if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
                var f = b.st[d] ? b.st[d].markup : !1;
                y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0
            }
            e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
            var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
            b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer), y("AfterChange")
        },
        appendContent: function(a, c) {
            b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "", y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content)
        },
        parseEl: function(c) {
            var d, e = b.items[c];
            if (e.tagName ? e = {
                    el: a(e)
                } : (d = e.type, e = {
                    data: e,
                    src: e.src
                }), e.el) {
                for (var f = b.types, g = 0; g < f.length; g++)
                    if (e.el.hasClass("mfp-" + f[g])) {
                        d = f[g];
                        break
                    }
                e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"))
            }
            return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, y("ElementParse", e), b.items[c]
        },
        addGroup: function(a, c) {
            var d = function(d) {
                d.mfpEl = this, b._openClick(d, a, c)
            };
            c || (c = {});
            var e = "click.magnificPopup";
            c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)))
        },
        _openClick: function(c, d, e) {
            var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
            if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
                var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                if (g)
                    if (a.isFunction(g)) {
                        if (!g.call(b)) return !0
                    } else if (v.width() < g) return !0;
                c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e)
            }
        },
        updateStatus: function(a, d) {
            if (b.preloader) {
                c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
                var e = {
                    status: a,
                    text: d
                };
                y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function(a) {
                    a.stopImmediatePropagation()
                }), b.container.addClass("mfp-s-" + a), c = a
            }
        },
        _checkIfClose: function(c) {
            if (!a(c).hasClass(s)) {
                var d = b.st.closeOnContentClick,
                    e = b.st.closeOnBgClick;
                if (d && e) return !0;
                if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;
                if (c === b.content[0] || a.contains(b.content[0], c)) {
                    if (d) return !0
                } else if (e && a.contains(document, c)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(a) {
            b.bgOverlay.addClass(a), b.wrap.addClass(a)
        },
        _removeClassFromMFP: function(a) {
            this.bgOverlay.removeClass(a), b.wrap.removeClass(a)
        },
        _hasScrollBar: function(a) {
            return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
        },
        _setFocus: function() {
            (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus()
        },
        _onFocusIn: function(c) {
            return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1)
        },
        _parseMarkup: function(b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function(c, d) {
                if (void 0 === d || d === !1) return !0;
                if (e = c.split("_"), e.length > 1) {
                    var f = b.find(p + "-" + e[0]);
                    if (f.length > 0) {
                        var g = e[1];
                        "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d)
                    }
                } else b.find(p + "-" + c).html(d)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === b.scrollbarSize) {
                var a = document.createElement("div");
                a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
            }
            return b.scrollbarSize
        }
    }, a.magnificPopup = {
        instance: null,
        proto: t.prototype,
        modules: [],
        open: function(b, c) {
            return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
        },
        close: function() {
            return a.magnificPopup.instance && a.magnificPopup.instance.close()
        },
        registerModule: function(b, c) {
            c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, a.fn.magnificPopup = function(c) {
        A();
        var d = a(this);
        if ("string" == typeof c)
            if ("open" === c) {
                var e, f = u ? d.data("magnificPopup") : d[0].magnificPopup,
                    g = parseInt(arguments[1], 10) || 0;
                f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({
                    mfpEl: e
                }, d, f)
            } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
        else c = a.extend(!0, {}, c), u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
        return d
    };
    var C, D, E, F = "inline",
        G = function() {
            E && (D.after(E.addClass(C)).detach(), E = null)
        };
    a.magnificPopup.registerModule(F, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                b.types.push(F), w(h + "." + F, function() {
                    G()
                })
            },
            getInline: function(c, d) {
                if (G(), c.src) {
                    var e = b.st.inline,
                        f = a(c.src);
                    if (f.length) {
                        var g = f[0].parentNode;
                        g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)), b.updateStatus("ready")
                    } else b.updateStatus("error", e.tNotFound), f = a("<div>");
                    return c.inlineElement = f, f
                }
                return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d
            }
        }
    });
    var H, I = "ajax",
        J = function() {
            H && a(document.body).removeClass(H)
        },
        K = function() {
            J(), b.req && b.req.abort()
        };
    a.magnificPopup.registerModule(I, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K)
            },
            getAjax: function(c) {
                H && a(document.body).addClass(H), b.updateStatus("loading");
                var d = a.extend({
                    url: c.src,
                    success: function(d, e, f) {
                        var g = {
                            data: d,
                            xhr: f
                        };
                        y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(), setTimeout(function() {
                            b.wrap.addClass(q)
                        }, 16), b.updateStatus("ready"), y("AjaxContentAdded")
                    },
                    error: function() {
                        J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src))
                    }
                }, b.st.ajax.settings);
                return b.req = a.ajax(d), ""
            }
        }
    });
    var L, M = function(c) {
        if (c.data && void 0 !== c.data.title) return c.data.title;
        var d = b.st.image.titleSrc;
        if (d) {
            if (a.isFunction(d)) return d.call(b, c);
            if (c.el) return c.el.attr(d) || ""
        }
        return ""
    };
    a.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var c = b.st.image,
                    d = ".image";
                b.types.push("image"), w(m + d, function() {
                    "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor)
                }), w(h + d, function() {
                    c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p)
                }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage)
            },
            resizeImage: function() {
                var a = b.currItem;
                if (a && a.img && b.st.image.verticalFit) {
                    var c = 0;
                    b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c)
                }
            },
            _onImageHasSize: function(a) {
                a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1))
            },
            findImageSize: function(a) {
                var c = 0,
                    d = a.img[0],
                    e = function(f) {
                        L && clearInterval(L), L = setInterval(function() {
                            return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void(3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)))
                        }, f)
                    };
                e(1)
            },
            getImage: function(c, d) {
                var e = 0,
                    f = function() {
                        c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g()))
                    },
                    g = function() {
                        c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0)
                    },
                    h = b.st.image,
                    i = d.find(".mfp-img");
                if (i.length) {
                    var j = document.createElement("img");
                    j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")), c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1)
                }
                return b._parseMarkup(d, {
                    title: M(c),
                    img_replaceWith: c.img
                }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d)
            }
        }
    });
    var N, O = function() {
        return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N
    };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(a) {
                return a.is("img") ? a : a.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var a, c = b.st.zoom,
                    d = ".zoom";
                if (c.enabled && b.supportsTransition) {
                    var e, f, g = c.duration,
                        j = function(a) {
                            var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                d = "all " + c.duration / 1e3 + "s " + c.easing,
                                e = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                f = "transition";
                            return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b
                        },
                        k = function() {
                            b.content.css("visibility", "visible")
                        };
                    w("BuildControls" + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
                            f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function() {
                                f.css(b._getOffset(!0)), e = setTimeout(function() {
                                    k(), setTimeout(function() {
                                        f.remove(), a = f = null, y("ZoomAnimationEnded")
                                    }, 16)
                                }, g)
                            }, 16)
                        }
                    }), w(i + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.st.removalDelay = g, !a) {
                                if (a = b._getItemToZoom(), !a) return;
                                f = j(a)
                            }
                            f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function() {
                                f.css(b._getOffset())
                            }, 16)
                        }
                    }), w(h + d, function() {
                        b._allowZoom() && (k(), f && f.remove(), a = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === b.currItem.type
            },
            _getItemToZoom: function() {
                return b.currItem.hasSize ? b.currItem.img : !1
            },
            _getOffset: function(c) {
                var d;
                d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
                var e = d.offset(),
                    f = parseInt(d.css("padding-top"), 10),
                    g = parseInt(d.css("padding-bottom"), 10);
                e.top -= a(window).scrollTop() - f;
                var h = {
                    width: d.width(),
                    height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
                };
                return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h
            }
        }
    });
    var P = "iframe",
        Q = "//about:blank",
        R = function(a) {
            if (b.currTemplate[P]) {
                var c = b.currTemplate[P].find("iframe");
                c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"))
            }
        };
    a.magnificPopup.registerModule(P, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                b.types.push(P), w("BeforeChange", function(a, b, c) {
                    b !== c && (b === P ? R() : c === P && R(!0))
                }), w(h + "." + P, function() {
                    R()
                })
            },
            getIframe: function(c, d) {
                var e = c.src,
                    f = b.st.iframe;
                a.each(f.patterns, function() {
                    return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0
                });
                var g = {};
                return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d
            }
        }
    });
    var S = function(a) {
            var c = b.items.length;
            return a > c - 1 ? a - c : 0 > a ? c + a : a
        },
        T = function(a, b, c) {
            return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
        };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var c = b.st.gallery,
                    e = ".mfp-gallery";
                return b.direction = !0, c && c.enabled ? (f += " mfp-gallery", w(m + e, function() {
                    c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function() {
                        return b.items.length > 1 ? (b.next(), !1) : void 0
                    }), d.on("keydown" + e, function(a) {
                        37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next()
                    })
                }), w("UpdateStatus" + e, function(a, c) {
                    c.text && (c.text = T(c.text, b.currItem.index, b.items.length))
                }), w(l + e, function(a, d, e, f) {
                    var g = b.items.length;
                    e.counter = g > 1 ? T(c.tCounter, f.index, g) : ""
                }), w("BuildControls" + e, function() {
                    if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                        var d = c.arrowMarkup,
                            e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
                            f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
                        e.click(function() {
                            b.prev()
                        }), f.click(function() {
                            b.next()
                        }), b.container.append(e.add(f))
                    }
                }), w(n + e, function() {
                    b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function() {
                        b.preloadNearbyImages(), b._preloadTimeout = null
                    }, 16)
                }), void w(h + e, function() {
                    d.off(e), b.wrap.off("click" + e), b.arrowRight = b.arrowLeft = null
                })) : !1
            },
            next: function() {
                b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML()
            },
            prev: function() {
                b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML()
            },
            goTo: function(a) {
                b.direction = a >= b.index, b.index = a, b.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var a, c = b.st.gallery.preload,
                    d = Math.min(c[0], b.items.length),
                    e = Math.min(c[1], b.items.length);
                for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);
                for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a)
            },
            _preloadItem: function(c) {
                if (c = S(c), !b.items[c].preloaded) {
                    var d = b.items[c];
                    d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
                        d.hasSize = !0
                    }).on("error.mfploader", function() {
                        d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d)
                    }).attr("src", d.src)), d.preloaded = !0
                }
            }
        }
    });
    var U = "retina";
    a.magnificPopup.registerModule(U, {
        options: {
            replaceSrc: function(a) {
                return a.src.replace(/\.\w+$/, function(a) {
                    return "@2x" + a
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var a = b.st.retina,
                        c = a.ratio;
                    c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function(a, b) {
                        b.img.css({
                            "max-width": b.img[0].naturalWidth / c,
                            width: "100%"
                        })
                    }), w("ElementParse." + U, function(b, d) {
                        d.src = a.replaceSrc(d, c)
                    }))
                }
            }
        }
    }), A()
});