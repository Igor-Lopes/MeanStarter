angular.module("views/modals/category-form-modal.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/category-form-modal.html",
    "<div class=\"modal fade \">"+
    "    <div class=\"modal-dialog\">"+
    "        <div class=\"modal-content\">"+
    "            <div class=\"modal-header\">"+
    "                <h4 class=\"modal-title\">{{categoryFormModalCtrl.title}}</h4>"+
    "                <button type=\"button\" ng-click=\"categoryFormModalCtrl.close(false)\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>"+
    "            </div>"+
    "            <div class=\"modal-body\">"+
    "                <form ng-submit=\"categoryFormModalCtrl.close(true)\" name=\"CategoryFormModal\" novalidate>"+
    "                    <div class=\"form-group\">"+
    "                      <label class=\"card-label\" for=\"formGroupExampleInput\">Categoria</label>"+
    "                      <input type=\"text\" name=\"name\" ng-model=\"categoryFormModalCtrl.inputs.name\" class=\"form-control\" placeholder=\"Digite um nome\" ng-class=\"{'has-error': CategoryFormModal.name.$invalid && CategoryFormModal.name.$dirty}\" verify-category required>"+
    "                      <div class=\"error-container\" ng-show=\"CategoryFormModal.name.$dirty && CategoryFormModal.name.$invalid\">"+
    "                        <small ng-show=\"CategoryFormModal.name.$error.required\" class=\"form-text text-muted text-danger\">O nome é obrigatório.</small>"+
    "                        <small ng-show=\"CategoryFormModal.name.$error.categoryExists\" class=\"form-text text-muted text-danger\">Este nome já foi usado em outra categoria.</small>"+
    "                      </div>"+
    "                    </div>"+
    "                    <div class=\"modal-footer\">"+
    "                        <button type=\"submit\" ng-disabled=\"CategoryFormModal.$invalid\" class=\"btn btn-primary\">{{categoryFormModalCtrl.label}}</button>"+
    "                        <button type=\"button\" ng-click=\"categoryFormModalCtrl.close(false)\" class=\"btn btn-default\" data-dismiss=\"modal\"> Cancelar</button>"+
    "                    </div>"+
    "                </form>"+
    "            </div>"+
    "        </div>"+
    "    </div>"+
    "</div>"+
    "");
}]);