/*!
 * Simple Library by DK v1.0 (https://github.com/alexysbike/simple-library.git)
 * Made by Alexys Gonzalez (DK)
 * alexysbike@gmail.com
 */
(function(){
    'use strict';

    angular
        .module('SimpleLibrary', [])
        .component('simpleLoading', simpleLoading())
        .factory('SimpleLoadingService', [simpleLoadingService])
        .filter('simpleToArray', toArrayFilter);
    
    function toArrayFilter(){
        return function (obj, addKey) {
            if (!angular.isObject(obj)) return obj;
            if ( addKey === false ) {
            return Object.keys(obj).map(function(key) {
                return obj[key];
            });
            } else {
            return Object.keys(obj).map(function (key) {
                var value = obj[key];
                return angular.isObject(value) ?
                Object.defineProperty(value, '$key', { enumerable: false, value: key}) :
                { $key: key, $value: value };
            });
            }
        };
    }

    function simpleLoading() {

        function componentController(SimpleLoadingService, $attrs){
            var vm = this;
            vm.loading = { active: false };
            vm.service = SimpleLoadingService;
            init();

            function init(){
                vm.loading = SimpleLoadingService.loading;
                $attrs.$set('style', 'z-index: 1000;');
            }
        }

        return {
            bindings: {
                img: "<"
            },
            controller: ['SimpleLoadingService', '$attrs', componentController],
            controllerAs: 'vm',
            template: [
                '<div ng-if="vm.loading.active" style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(140, 140, 140, 0.50);">',
                    '<img ng-src="{{vm.img}}" style="width:70px;position: absolute;top: 50%;left: 50%;margin-left:-35px;margin-top:-35px">',
                '</div>'
            ].join('')
        }
    }

    /** @ngInject */
    function simpleLoadingService(){
        this.loading = { active: false };

        return {
            loading: this.loading,
            activate: activate,
            desactivate: desactivate
        };

        function activate(){
            this.loading.active = true;
        }

        function desactivate(){
            this.loading.active = false;
        }
    }
}());