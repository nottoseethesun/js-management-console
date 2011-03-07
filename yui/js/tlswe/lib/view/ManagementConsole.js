/**
 * <p>
 * Provides a user-interface for a data-oriented Web application.  Good for use with
 * single-"Web page" Web applications. The basic skeleton of the user-interface is
 * similar to that used in MS (R) Outlook and other applications: a left-hand column,
 * a main center column divided into a master-detail pane arrangement, and a right-hand column.
 * </p>
 * This is a JavaScript widget class for a minimal-JavaScript-based implementation of
 * a Management Console that provides a liquid three-column layout with a center
 * column having a pair of master-detail panes.
 * <p>
 * Works in all modern browsers and, it seems, in IE 8 and IE 7  (reloading sometimes
 * required for IE 7).  The aim has been to let
 * the css and html take care of as much as possible,
 * for fast load time and responsiveness.
 * </p>
 * YUI3 was chosen for the JavaScript engine as it is freely available and aligns closely
 * with html and css, observing a good separation of concerns.
 * </p>
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
 *
 * @static callee.displayName <code>string</code> <code>private-scope_for_tlswe.view.ManagementConsole</code>
 *         A special identifier used to identify the private scope of this class definition for
 *         the purposes of performance profiling and debugging.
 * @static S_EXAMPLE_EVENT <code>tlswe.example_event</code> The name of an event that instances of
 *         this class publish.
 * @object $S_DATATYPE <code>string</code> tlswe.view.ManagementConsole This is an instance property so
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
 * @version $Id$
 */
YUI().use("base", "resize", "node", (function callee(Y) {
   // This must be alone as its own statement.  It turns on ES5 Strict Mode in browsers that support it.
   "use strict";
   // Used for performance profiling and debugging.  Modify for your use.
   callee.displayName = "private-scope_for_tlswe.view.ManagementConsole";

   var // - - - Reference-caching Shortcuts:
       YUI  = self.YUI,
       tlswe  = self.tlswe,
       view = tlswe.view,
       CommonMsgs = tlswe.view.resources.locale.Common,
       // - - - Utility Values:
       $S_DATATYPE = "tlswe.view.ManagementConsole",
       iSeed = 0;
       // - - - Application Values: * Change ';' above to ',' if adding app values *


   tlswe.view.ManagementConsole = Y.Base.create($S_DATATYPE, Y.Base, [

        // ----------------------------- Public Instance Methods

        /**
         * Initializes a new instance of the Template class.
         * @param p_oConfig JSONObject Describe its properties here.
         * @return Object <code>this</code>
         */
        function initializer(p_oConfig) {
          if(!this.$S_UNIQUE_ID) {
                   // The Ext facility does a wasteful DOM call for this, so we use our own seed.
            this.$S_UNIQUE_ID = this.$S_DATATYPE + "_" + (iSeed++);
          }

          this.oWrappedWindow = Y.one(window); // Cache for performance.
          this.getElements();
          this.setConsolePanesProportionally();
          this.setUpResizableViewPort();
          this.show();
        },


        /**
         * Tasks Template needs to perform during
         * the destroy() lifecycle phase
         */
        function destructor() {
            // @to-do: Use reference-nulling utility from framework or implement a simple one.
        }

    ],

    // ------------------------ Public Instance Properties and Methods (if private, prefix with 'm_'):

    {
      $S_DATATYPE: $S_DATATYPE,
      I_MIN_CENTER_COLUMN_WIDTH_PX: 25,

      // ----------------------- Public/Inheritable Methods:

      getElements: function() {
          var oMainContent;

          this.oHeader       = Y.one(".tlswe-mc-header");
          this.oFooter       = Y.one(".tlswe-mc-footer");

          this.oMainContent  = oMainContent = Y.one( " .tlswe-mc-main-content " );
          this.oLeftColumn   = oMainContent.one( " .tlswe-mc-left"   );
          this.oCenterColumn = oMainContent.one( " .tlswe-mc-center" );
          this.oMasterDetailResizer = this.oCenterColumn.one( " .tlswe-mc-resize-border" );

          this.oRightColumn   = oMainContent.one( " .tlswe-mc-right"  );
          this.oMasterPane    = oMainContent.one( " .tlswe-mc-center " + " .tlswe-master-detail.tlswe-master" );
          this.oDetailPane    = oMainContent.one( " .tlswe-mc-center " + " .tlswe-master-detail.tlswe-detail" );
          this.oDetailContent = this.oDetailPane.one( " .tlswe-content" );

          this.iHeaderFooterHeightPx = parseInt( this.oHeader.getComputedStyle( "height" ) ) +
              parseInt( this.oFooter.getComputedStyle( "height" ) );
      },


        setUpResizableViewPort: function() {
            var oLeftColumn   = this.oLeftColumn,
                oCenterColumn = this.oCenterColumn,
                oRightColumn  = this.oRightColumn,
                oMasterPane   = this.oMasterPane,
                oDetailPane   = this.oDetailPane,
                iMinCenterColumnWidthPx = this.I_MIN_CENTER_COLUMN_WIDTH_PX,
                that          = this,
                oResize, oResizeLC, oResizeRC, oResizeDT;

            this.updateCachedDimensions();

            oResizeLC = new Y.Resize({
                                         node: oLeftColumn,  // Selector of the node to resize.
                                         maxWidth: 500,
                                         handles: "r"
                                     });
            oResizeRC = new Y.Resize({
                                         node: oRightColumn,
                                         maxWidth: 700,
                                         handles: "l"
                                     });
            oResizeDT = new Y.Resize({
                                         node: oDetailPane,
                                         handles: "t"
                                     });

            /*-
             * I'd like to leverage bubbling and check the DOM element's css classname
             * for a semantic identifier in a 'switch' JavaScript statement
             * instead of adding a handler for each resizable element.  But I can't see how to get to the
             * DOM target; 'p_oEvent.currentTarget.get("class")' does not give the desired result.
             * There is likely a way to do that but it'll have to wait.
             */
            oResizeLC.on('resize:resize', handleResizeLC, this);
            oResizeRC.on('resize:resize', handleResizeRC, this);
            oResizeDT.on('resize:resize', handleResizeDT, this);

            oResizeLC.on('resize:end', handleResizeEnd, this);
            oResizeRC.on('resize:end', handleResizeEnd, this);
            oResizeDT.on('resize:end', handleResizeEnd, this);

            // To avoid pegging the machine, only resize when user has stopped dragging the browser window:
            Y.Env.evt.plugins.windowresize.on( "window:resize",
                                               function(p_oEvent) {
                                                   that.handleWindowResize.call( that, p_oEvent );
                                               } );

            // - - - - Inner Methods:


            function handleResizeLC( p_oEvent ) {
                processResize.call( that, p_oEvent, oLeftColumn, "width",  "iLeftColumnOldWidth",  oCenterColumn,
                                    "iCenterColumnOldWidth" );
            }


            function handleResizeRC( p_oEvent ) {
                processResize.call( that, p_oEvent, oRightColumn, "width", "iRightColumnOldWidth", oCenterColumn,
                                    "iCenterColumnOldWidth" );
            }


            function handleResizeDT( p_oEvent ) {
                processResize.call( that, p_oEvent, oDetailPane, "height", "iDetailPaneOldHeight", oMasterPane,
                                    "iMasterPaneOldHeight" );
            }


            function processResize( p_oEvent, p_oCurrentEventTarget, p_sDimension, p_sOldDimensionIdentifier,
                                    p_oAdjustingElement, p_sAdjustingElementOldDimensionIdentifier ) {
                                        var iCenterColumnWidthPx = parseInt( oCenterColumn.getComputedStyle( "width" ) ),
                                        iCurrentAdjustingElementDimension, iDelta, iNewDimension, iWidth;

                                        if(iCenterColumnWidthPx < iMinCenterColumnWidthPx) {
                                            p_oEvent.halt( true );
                                            this.ensureCenterColumnWidthFits( iCenterColumnWidthPx );
                                            this.setDetailPaneWidth();

                                            return;
                                        }
                                        iCurrentAdjustingElementDimension = parseInt( p_oAdjustingElement.getComputedStyle( p_sDimension ) );
                                        iDelta = updateDelta.call( this, p_oCurrentEventTarget, p_sDimension, p_sOldDimensionIdentifier );
                                        iNewDimension =  iCurrentAdjustingElementDimension + iDelta;

                                        p_oAdjustingElement.setStyle( p_sDimension, iNewDimension + "px" );
                                        this[p_sAdjustingElementOldDimensionIdentifier] = iNewDimension; // Update cache.

                                        // Handle the unique cases:
                                        if(p_oCurrentEventTarget === oLeftColumn) {
                                            adjustCenterColumnLeft.call(this, iDelta);
                                        }
                                        this.setDetailPaneWidth();
                                    }


            function handleResizeEnd( p_oEvent ) {
                var iCenterColumnWidthPx = parseInt( oCenterColumn.getComputedStyle( "width" ) );

                this.ensureCenterColumnWidthFits( iCenterColumnWidthPx );
                this.setDetailPaneWidth( iCenterColumnWidthPx );
            }


            function updateDelta( p_oCurrentEventTarget, p_sDimension, p_sOldDimensionIdentifier ) {
                var iOldDimension = this[p_sOldDimensionIdentifier],
                iCurrentDimension = parseInt(p_oCurrentEventTarget.getComputedStyle(p_sDimension)),
                iDelta = iOldDimension - iCurrentDimension;

                this[p_sOldDimensionIdentifier] = iCurrentDimension; // Update cache.

                return iDelta;
            }


            function adjustCenterColumnLeft( p_iDeltaPx ) {
                var iCurrentLeft = parseInt( oCenterColumn.getComputedStyle( "left" ) ),
                iNewLeft     = iCurrentLeft - p_iDeltaPx;

                oCenterColumn.setStyle( "left", iNewLeft + "px" );
            }
        },


      handleWindowResize: function( p_oEvent ) {
          this.setConsolePanesProportionally();
          this.updateCachedDimensions();
      },


      setConsolePanesProportionally: function() {
        var aColumnProportions = this.getColumnProportions(),
            aDocumentHeightWidth = this.getDocumentHeightWidth(),
            iHeightPx   = aDocumentHeightWidth[0],
            iTotalWidth = aDocumentHeightWidth[1],
            iLC = Math.round( aColumnProportions[ 0 ] * iTotalWidth ),
            iCC = Math.round( aColumnProportions[ 1 ] * iTotalWidth ),
            iRC = Math.round( aColumnProportions[ 2 ] * iTotalWidth ),
            iRemainder = iTotalWidth - ( iLC + iCC + iRC ),
            iHeightMainContentPx, iHeightDetailPanePx;

        if(iRemainder !== 0) {
            iCC = iCC + iRemainder; // The center has plenty of meat to yield a pixel here and there.
        }

        this.setColumnWidths( iLC, iCC, iRC );

        iHeightMainContentPx = iHeightPx - this.iHeaderFooterHeightPx;
        iHeightDetailPanePx  = iHeightPx - parseInt( this.oMasterPane.getComputedStyle( "height" ) );

        /*-
         * After resizing columns/panels, they somehow, unmagically, lose their ability
         * to autosize their height ('height: 100%' doesn't work anymore, and 'bottom: 0px'
         * doesn't work anymore).  This may be due to
         * action of the JavaScript framework.  So we have to manually set the height.
         */
        this.oLeftColumn.setStyle(   "height", iHeightMainContentPx + "px" );
        this.setDetailPaneWidth( iCC );
        this.oCenterColumn.setStyle( "height", iHeightMainContentPx + "px" );
        this.oRightColumn.setStyle(  "height", iHeightMainContentPx + "px" );
        this.oDetailPane.setStyle(   "height", iHeightDetailPanePx  + "px" );
      },


      ensureCenterColumnWidthFits: function( p_iCenterColumnWidthPx ) {
          var iMinCenterColumnWidthPx = this.I_MIN_CENTER_COLUMN_WIDTH_PX,
              oLeftColumn   = this.oLeftColumn,
              oCenterColumn = this.oCenterColumn,
              oRightColumn  = this.oRightColumn,
              iLCWidth = parseInt( oLeftColumn.getComputedStyle(  "width" ) ),
              iRCWidth = parseInt( oRightColumn.getComputedStyle( "width" ) ),
              iTotalWidth = this.getDocumentHeightWidth()[1],
              iTargetCenterColumnWidth = iTotalWidth - iLCWidth - iRCWidth,
              iSubSize, iTargetLCWidth, iTargetRCWidth;

          if( iTargetCenterColumnWidth >= iMinCenterColumnWidthPx ) {

              return;
          }
          iSubSize = iMinCenterColumnWidthPx - iTargetCenterColumnWidth;
          iTargetLCWidth = iLCWidth - Math.ceil( iSubSize/2 );
          iTargetRCWidth = iRCWidth - Math.ceil( iSubSize/2 );
          this.setColumnWidths( iTargetLCWidth, iMinCenterColumnWidthPx, iTargetRCWidth );
          this.updateCachedDimensions();
      },


      setColumnWidths: function( p_iLeftColumnWidthPx, p_iCenterColumnWidthPx, p_iRightColumnWidthPx ) {
          this.oLeftColumn.setStyle(   "width", p_iLeftColumnWidthPx    + "px" );
          this.oCenterColumn.setStyle( "left",  p_iLeftColumnWidthPx    + "px" );
          this.oCenterColumn.setStyle( "width", p_iCenterColumnWidthPx  + "px" );
          this.oRightColumn.setStyle(  "left",  ( p_iLeftColumnWidthPx  + p_iCenterColumnWidthPx ) + "px" );
          this.oRightColumn.setStyle(  "width", p_iRightColumnWidthPx   + "px" );
      },


      setDetailPaneWidth: function( p_iCenterColumnWidthPx ) {
          var iCenterColumnWidthPx;

          if( typeof p_iCenterColumnWidthPx === "undefined" ) {
              iCenterColumnWidthPx = parseInt( this.oCenterColumn.getComputedStyle( "width" ) );
          } else {
              iCenterColumnWidthPx = p_iCenterColumnWidthPx;
          }
          this.oCenterColumn.setStyle(        "width",  iCenterColumnWidthPx + "px" );
          this.oMasterDetailResizer.setStyle( "width",  iCenterColumnWidthPx + "px" );
          this.oDetailPane.setStyle(          "width",  iCenterColumnWidthPx + "px" );
      },


      getDocumentHeightWidth: function() {
          var oNode = this.oWrappedWindow,
              aHW = [ oNode.get( "winHeight" ), oNode.get( "winWidth" ) ];

          return aHW;
      },


      getColumnProportions: function() {
          var iLC = parseInt( this.oLeftColumn.getComputedStyle(   "width" ) ),
              iCC = parseInt( this.oCenterColumn.getComputedStyle( "width" ) ),
              iRC = parseInt( this.oRightColumn.getComputedStyle(  "width" ) ),
              iTotal = iLC + iCC + iRC,
              aProportions = [ iLC / iTotal, iCC / iTotal, iRC / iTotal ];

          return aProportions;
      },


      updateCachedDimensions: function() {
          this.iLeftColumnOldWidth   = parseInt( this.oLeftColumn.getComputedStyle(   "width"  ));
          this.iCenterColumnOldWidth = parseInt( this.oCenterColumn.getComputedStyle( "width"  ));
          this.iRightColumnOldWidth  = parseInt( this.oRightColumn.getComputedStyle(  "width"  ));
          this.iMasterPaneOldHeight  = parseInt( this.oMasterPane.getComputedStyle(   "height" ));
          this.iDetailPaneOldHeight  = parseInt( this.oDetailPane.getComputedStyle(   "height" ));
      },


      show: function() {
          this.oMainContent.removeClass( "tlswe-hidden" );
      },


      hide: function() {
          this.oMainContent.addClass( "tlswe-hidden" );
      }

    },

    // ------------------------ Public Static Properties and Methods (if private, prefix with 'm_'):

    {
    });


    // ----------------------- Private Methods:

   // - - - For Performance Profiling Purposes (instantation profiling):
   tlswe.view.ManagementConsole.displayName = "tlswe.view.ManagementConsole_constructor";
}));
