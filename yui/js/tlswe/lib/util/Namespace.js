/**
 * Creates a global namespace for custom JavaScript code, to avoid namespace clashes.
 */
(function() {
   self.tlswe = self.tlswe ? self.tlswe : {

     model : {
     },

     view : {
       resources: {
         locale: {
           Common: { // @to-do: Move this to a separate file.
           }
         }
       }
     },

     controller : {

     },

     util : {

     }
   };
 })();

