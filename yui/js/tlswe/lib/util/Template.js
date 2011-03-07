/**
 * <p>
 * The Template class for an 'tlswe' JavaScript class that uses YUI3.
 * While this template is currently fitted to the YUI Js Framework, developers using other js frameworks
 * can easily customize it to suit.  Customizing entails replacing the key identifiers in the class
 * creation machinery and any other YUI-specific code.
 *
 * <p>
    License:

    By 'source', below, is meant the html page and the associated css (in the css files linked and
    any in-line) and the non-YUI3 JavaScript used for positioning the columns and
    master-detail panes of the Management Console.  For further detail on the license, see:
    http://www.opensource.org/licenses/bsd-license.php

    Copyright (c) 2011, Christopher M. Balz
    All rights reserved.

    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of Christopher M. Balz nor the names of his contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * </p> 
 *
 * For example, the js call 'Base.create' would be replaced
 * by whatever the specific js framework's call to get a class constructor is.
 * Similarly, the rest of the constructor mechanism, such as the call to 'YUI.aggregate',
 * would need to be adapted.  And of course the reference shortcuts to 'self.Ext'
 * would need to be adapted.
 * </p>
 * </p>
 * When using this template, leave in the scaffolding items such as the reference shortcuts,
 * and the i.d. and data-type code.
 * </p>
 *
 * @static callee.displayName <code>string</code> <code>private-scope_for_tlswe.util.Template</code>
 *         A special identifier used to identify the private scope of this class definition for
 *         the purposes of performance profiling and debugging.
 * @static S_EXAMPLE_EVENT <code>tlswe.example_event</code> The name of an event that instances of
 *         this class publish.
 * @object $S_DATATYPE <code>string</code> tlswe.util.Template This is an instance property so
 *         that it can be accessed via <code>this</code>, but it is the same for all classes.
 * @object $S_UNIQUE_ID <code>integer</code> The unique identifier for this class.
 *         The trailing digit signifies the nth instantiation of this class.
 * @object iConfigNumber <code>integer</code> An example instance property.
 *
 * @subscribes tlswe.example_event Just to show an example subscription to a simple event.
 * @publishes tlswe.example_event Just to show an example publishing of a simple event.
 * @extends Object
 * @see YUI3
 * @author cbalz
 * @version $Id: TLSWETemplate.js 29679 2011-01-25 00:28:09Z cbalz $
 */
YUI().use("base", (function callee(Y) {
   // This must be alone as its own statement.  It turns on ES5 Strict Mode in browsers that support it.
   "use strict";
   // Used for performance profiling and debugging.  Modify for your use.
   callee.displayName = "private-scope_for_tlswe.util.Template";

   var // - - - Reference-caching Shortcuts:
       YUI  = self.YUI,
       tlswe  = self.tlswe,
       view = tlswe.view,
       CommonMsgs = tlswe.view.resources.locale.Common,
       // - - - Utility Values:
       $S_DATATYPE = "tlswe.util.Template",
       iSeed = 0;
       // - - - Application Values: * Change ';' above to ',' if adding app values *


   tlswe.util.Template = Y.Base.create($S_DATATYPE, Y.Base, [

        // ----------------------------- Public Instance Methods

        /**
         * Creates a new instance of the Template class.
         * @param p_oConfig JSONObject Describe its properties here.
         */
        function initializer(p_oConfig) {
          // var that = this;  // Delete unless needed, such as for singleton (below).

          if(!this.$S_UNIQUE_ID) {
                   // The Ext facility does a wasteful DOM call for this, so we use our own seed.
            this.$S_UNIQUE_ID = this.$S_DATATYPE + "_" + (iSeed++);
          }

          // Consider subscribing to events on the global event bus.

          /* Delete this block unless you need this class to be a singleton.
          // Enforce singleton:
          tlswe.controller.BootLoader = function() {

            return that;
          };
          */
        },

        /**
         * Tasks Template needs to perform during
         * the destroy() lifecycle phase
         */
        function destructor() {
        }
    ],

    // ------------------------ Public Instance Properties and Methods (if private, prefix with 'm_'):

    {
      $S_DATATYPE: $S_DATATYPE,

      // ----------------------- Public Methods:

      /**
       * Does something public.
       */
      doPublicThing: function() {
      },

      /**
       * Handle 'Template'-relevant events.
       * @param p_oEvent <code>tlswe.core.Event</code> An <code>tlswe</code> JavaScript
       *        synthetic event.
       */
      handleEvent: function(p_oEvent) {
        var oApplication, oPage;

        if(!p_oEvent) {

          return;
        }
        switch(p_oEvent.sName) {
        case "tlswe.some_other_example_event":
          processSomeOtherExampleEvent.call(this, p_oEvent);
        }
      }
    },

    // ------------------------ Public Static Properties and Methods (if private, prefix with 'm_'):

    {
      S_EXAMPLE_EVENT: "tlswe.example_event"
    });


    // ----------------------- Private Methods:

    /**
     * Does something private.
     * @param p_sMsg <code>string</code> The message.
     * @return string The processed message.
     */
    function doPrivateThing(p_sMsg) {

        return p_sMsg;
    }

    /**
     * Do something that needs to be done when we get a 'some other example event'.
     * @param p_oEvent <code>tlswe.core.Event</code> An <code>tlswe</code> JavaScript
     *        synthetic event.
     */
    function processSomeOtherExampleEvent(p_oEvent) {
        ;
    }

   // - - - For Performance Profiling Purposes (instantation profiling):
   tlswe.util.Template.displayName = "tlswe.util.Template_constructor";
}));