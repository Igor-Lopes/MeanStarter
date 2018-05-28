angular.module("views/modals/subcategory-form-modal.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/subcategory-form-modal.html",
    "<div class=\"modal fade \">"+
    "    <div class=\"modal-dialog\">"+
    "        <div class=\"modal-content\">"+
    "            <div class=\"modal-header\">"+
    "                <h4 class=\"modal-title\">{{subcategoryFormModalCtrl.title}}</h4>"+
    "                <button type=\"button\" ng-click=\"subcategoryFormModalCtrl.close(false)\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>"+
    "            </div>"+
    "            <div class=\"modal-body\">"+
    "                <form ng-submit=\"subcategoryFormModalCtrl.close(true)\" name=\"SubcategoryFormModal\" novalidate>"+
    "                    <div class=\"form-group\">"+
    "                      <label class=\"card-label\" for=\"formGroupExampleInput\">Subcategoria</label>"+
    "                      <input type=\"text\" name=\"name\" ng-model=\"subcategoryFormModalCtrl.inputs.name\" class=\"form-control\" placeholder=\"Digite um nome\" ng-class=\"{'has-error': SubcategoryFormModal.name.$invalid && SubcategoryFormModal.name.$dirty}\" verify-subcategory required>"+
    "                      <div class=\"error-container\" ng-show=\"SubcategoryFormModal.name.$dirty && SubcategoryFormModal.name.$invalid\">"+
    "                        <small ng-show=\"SubcategoryFormModal.name.$error.required\" class=\"form-text text-muted text-danger\">O nome é obrigatório.</small>"+
    "                        <small ng-show=\"SubcategoryFormModal.name.$error.subcategoryExists\" class=\"form-text text-muted text-danger\">Este nome já foi usado em outra subcategoria.</small>"+
    "                      </div>"+
    "                    </div>"+
    "                    <div class=\"form-group\">"+
    "                      <label class=\"card-label\" for=\"formGroupExampleInput\">Selecione a Categoria</label>"+
    "                      <select style=\"display: block;\" name=\"category\" class=\"custom-select mb-sm-0 mr-sm-2 input-md\" id=\"predicate\" ng-model=\"subcategoryFormModalCtrl.inputs.category\" ng-options=\"category.title as category.title for category in subcategoryFormModalCtrl.categories\" ng-selected=\"{{category.title == subcategoryFormModalCtrl.selectedCategory}}\" ng-class=\"{'has-error': SubcategoryFormModal.category.$invalid && SubcategoryFormModal.category.$dirty}\" verify-select-category ng-required=\"true\"></select>"+
    "                      <div class=\"error-container\" ng-show=\"SubcategoryFormModal.category.$dirty && SubcategoryFormModal.category.$invalid\">"+
    "                        <small ng-show=\"SubcategoryFormModal.category.$error.required\" class=\"form-text text-muted text-danger\">Selecionar uma categoria é obrigatório.</small>"+
    "                        <small ng-show=\"SubcategoryFormModal.category.$error.selecOtherCategory\" class=\"form-text text-muted text-danger\">Selecione uma categoria válida.</small>"+
    "                      </div>"+
    "                    </div>"+
    "                    <div class=\"modal-footer\">"+
    "                        <button type=\"submit\" ng-disabled=\"SubcategoryFormModal.$invalid\" class=\"btn btn-primary\">{{subcategoryFormModalCtrl.label}}</button>"+
    "                        <button type=\"button\" ng-click=\"subcategoryFormModalCtrl.close(false)\" class=\"btn btn-default\" data-dismiss=\"modal\"> Cancelar</button>"+
    "                    </div>"+
    "                </form>"+
    "            </div>"+
    "        </div>"+
    "    </div>"+
    "</div>"+
    "");
}]);