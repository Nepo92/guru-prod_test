(function($){
    var $HB;
    var $panels = $();

    $.fn.tabby = function (options) {
        var settings = $.extend({}, {
            panels: '[js-tabby-panel]',
            openFirst: true
        }, options);
        var $tabs = $(this);
        $panels = $panels.add( $(settings.panels) );

        return $tabs.each(function (i, tab) {
            var $tab = $(tab);
            var rel = $tab.data('tabby-rel') || undefined;
            var isLabel = $tab.is('label');
            var isSelect = $tab.is('select');
            var scroll = $tab.data('tabby-scroll');
            var data = isSelect ? $tab.find(':selected').data('tabby').split(':') : $tab.data('tabby') ? $tab.data('tabby').split(':') : undefined;
            if ( !data ) return;
            var $scroll = scroll ? ( scroll == 'self' || scroll == true ? $tab : scroll == 'parent' ? $tab.parent() : scroll.length ? $(scroll) : $() ) : $();
            var hasPanel = getPanels($panels, data).length;

            if ( !hasPanel ) {
                $tab.addClass('is-broken');
            }

            $tab.off('.tabby').on({
                'click.tabby openTab.tabby': function (e, eData) {
                    (!isLabel || !isSelect) && e.preventDefault();

                    if ( e.type == 'click' ) {
                        if ( $tab.hasClass('is-open') ) {
                            if ( $tab.data('tabby-selfclose') ) {
                                $tab.removeClass('is-open');
                                getPanels($panels, data)[1].removeClass('is-open');
                            }
                            return;
                        }
                        if ( rel ) {
                            rel.forEach(function (_rel) {
                                getTabs($tabs, _rel.split(':'))[1].trigger('openTab');
                            });
                        }
                    }
                    else {
                        e.stopPropagation();
                    }

                    if ( !hasPanel || (!data && !isSelect) ) {
                        $tab.addClass('is-broken');
                        return;
                    }
                    else {
                        var $tabs_filtered = getTabs($tabs, data);
                        $tabs_filtered[0].removeClass('is-open');
                        $tabs_filtered[1].not('select').addClass('is-open');
                        $tabs_filtered[1].filter('select').trigger('tabSelect', {tabData: data});

                        var $tab_panels = getPanels($panels, data);
                        var $tab_panels_opened = $tab_panels[0].filter('.is-open');
                        $tab_panels_opened.removeClass('is-open');
                        $tab_panels[1].addClass('is-open');

                        $tab.trigger('tabChanged', {
                            panel: $tab_panels[1].trigger('tabChanged', {
                                tab: $tab,
                                otherPanels: $tab_panels[0].not($tab_panels[1]),
                                wasOpenedPanels: $tab_panels_opened
                            })
                        });

                        if ( scroll == 'panel' && $HB && !(eData && eData.scroll == false) ) {
                            $HB.not(':animated').animate({scrollTop: $tab_panels[1].offset().top}, 300);
                        }
                        else if ( $scroll.length && $HB && !(eData && eData.scroll == false) ) {
                            $HB.not(':animated').animate({scrollTop: $scroll.offset().top}, 300);
                        }
                    }
                },
                'closeTab.tabby': function (e, eData) {
                    e.stopPropagation();
                    var $tab_panels = getPanels($panels, data);
                    $tab.removeClass('is-open');
                    $tab_panels[1].removeClass('is-open');
                    $tab.trigger('tabClosed', {
                        panel: $tab_panels[1].trigger('tabClosed', {
                            tab: $tab,
                            otherPanels: $tab_panels[0].not($tab_panels[1])
                        })
                    });
                }
            });

            if ( isLabel ) {
                var $input = $tab.attr('for') ? $('input#'+ $tab.attr('for')) : $tab.find('input');
                if ( $input.length ) {
                    $tab.off('click.tabby');
                    $input.off('.tabby').on({
                        'change.tabby': function (e) {
                            if ( $input.prop('checked') ) {
                                $tab.trigger('openTab');
                            }
                            else {
                                $tab.trigger('closeTab');
                            }
                        }
                    });
                }
            }

            if ( isSelect ) {
                $tab.off('click.tabby').on({
                    'change.tabby changeTabby.tabby': function (e, eData) {
                        e.stopPropagation();
                        data = $tab.find(':selected').data('tabby');
                        if ( !data ) {
                            data = $tab.data('tabby');
                            if ( !data ) return;

                            data = data.split(':');
                            $tab.trigger('closeTab');
                            return;
                        }

                        data = $tab.find(':selected').data('tabby');
                        $tab.data('tabby', data);
                        data = data.split(':');
                        $tab.trigger('openTab');
                    },
                    'openTab.tabby': function (e, eData) {
                        e.stopPropagation();
                        $tab.trigger('updateSelect');
                    },
                    'updateSelect.tabby': function (e, eData) {
                        e.stopPropagation();
                    },
                    'tabSelect.tabby': function (e, eData) {
                        e.stopPropagation();
                        if ( eData && eData.tabData ) {
                            $tab.val($tab.find('[data-tabby]').filter(function (optionIndex, option) {
                                return $(option).data('tabby').split(':')[1] == eData.tabData[1];
                            }).val());
                            $tab.trigger('silentChange');
                        }
                    },
                });

                if ( $tab.hasClass('is-open') ) {
                    $tab.trigger('changeTabby');
                }
            }

            if ( (!isLabel && $tab.hasClass('is-open')) || (isLabel && $input.prop('checked')) ) {
                $tab.trigger('openTab', {scroll: false});
            }
            else if ( $tab.hasClass('is-open') ) {
                $tab.trigger('closeTab');
            }

        });
    };

    function getTabs ($tabs, data) {
        var $tabs_filtered = $tabs.filter(function (i, panel) {
            var $tab = $tabs.eq(i);
            if ( $tab.is('select') ) {
                return $tab.find('[data-tabby]').filter(function (optionIndex, option) {
                    return $(option).data('tabby').split(':')[0] == data[0];
                }).length > 0;
            }
            return $tab.data('tabby') && $tab.data('tabby').split(':')[0] == data[0];
        });
        return [$tabs_filtered, $tabs_filtered.filter(function (i, panel) {
            var $tab = $tabs_filtered.eq(i);
            if ( $tab.is('select') ) {
                return $tab.find('[data-tabby]').filter(function (optionIndex, option) {
                    return $(option).data('tabby').split(':')[1] == data[1];
                }).length > 0;
            }
            return $tab.data('tabby').split(':')[1] == data[1];
        })];
    }
    function getPanels ($panels, data) {
        var $panels_filtered = $panels.filter(function (i, panel) {
            return $panels.eq(i).data('tabby') && $panels.eq(i).data('tabby').split(':')[0] == data[0];
        });
        return [$panels_filtered, $panels_filtered.filter(function (i, panel) {
            return $panels_filtered.eq(i).data('tabby').split(':')[1] == data[1];
        })];
    }


    $(function(){
        $HB = $('html, body');
    });
})(jQuery);
