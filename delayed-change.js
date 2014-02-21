/*global angular*/

/**
 * @ngdoc overview
 * @name delayed-change
 * @description
 *
 * Serves a similar functionality as @ngChange, but groups calls
 * together if they are done quickly after one another.
 *
 * Useful for avoiding intensive function calls done often
 * (e.g. fast typing) into one call.
 */
(function () {
    var delayedChange = angular.module('delayed-change', []);
    /**
     * @ngdoc directive
     * @name delayed-change:delayedChange
     * @description
     * Directive for delayed change functionality
     */
    delayedChange.directive('delayedChange', ['$timeout', '$q', function ($timeout, $q) {
        var defaults = {
            delay: 300, //The max time to wait before calling change function
            start: null, //Function called before change function is called
            end: null //Function called after change function is called
        };

        return {
            require: 'ngModel',
            scope: {
                delayedOptions: '=',
                delayedChange: '@'
            },
            link: function (scope, element, attr, ctrl) {
                var options = angular.extend(defaults, scope.delayedOptions);

                var promise; //The promise of the upcoming function call

                ctrl.$viewChangeListeners.push(function () {
                    angular.isFunction(options.start) && options.start();

                    //Cancel the pending function call, if any
                    if (promise) {
                        $timeout.cancel(promise);
                    }

                    promise = $timeout(function () {
                        var result = scope.$parent.$eval(scope.delayedChange);

                        //Trigger end function after (promise) resolve
                        $q.when(result).then(function () {
                            angular.isFunction(options.end) && options.end();
                        })

                    }, options.delay);
                });
            }
        }
    }]);
})();