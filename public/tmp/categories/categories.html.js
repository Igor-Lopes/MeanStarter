angular.module("views/categories/categories.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/categories.html",
    "<div id=\"content\" class=\"container-fluid side-toogle\">"+
    "  <div class=\"col-md-12\">"+
    "    <div class=\"card\">"+
    "      <div class=\"card-header\">"+
    "        Tabela Gerencial de Categorias"+
    "      </div>"+
    "      <div class=\"card-block\">"+
    "        <div class=\"row\">"+
    "          <div class=\"col-md-12\">"+
    "            <form class=\"form-inline\">"+
    "              <div class=\"input-group mb-4 mr-sm-4 mb-sm-0\">"+
    "                <div class=\"input-group-addon\"><i class=\"material-icons\">search</i></div>"+
    "                <input ng-model=\"categoriesCtrl.key\" ng-change=\"categoriesCtrl.update()\" type=\"text\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"Pesquisa ...\">"+
    "              </div>"+
    "              <select class=\"custom-select mb-sm-0 mr-sm-2 input-md\" id=\"predicate\" ng-model=\"categoriesCtrl.selectedPredicate\" ng-change=\"categoriesCtrl.update()\" ng-options=\"predicate.label as predicate.label for predicate in categoriesCtrl.predicates\" ng-selected=\"{{predicate.label == categoriesCtrl.selectedPredicate}}\"></select>"+
    "              <button ng-click=\"categoriesCtrl.clean()\" type=\"button\" class=\"btn btn-default\">Limpar filtro</button>"+
    "              <button ng-click=\"categoriesCtrl.create()\" type=\"button\" class=\"btn btn-primary btn-margin\">Novo</button>"+
    "            </form>"+
    "          </div>"+
    "        </div>"+
    ""+
    "        <table ng-if=\"categoriesCtrl.showTable == true\" class=\"table table-striped table-responsive\" at-table at-paginated at-list=\"categoriesCtrl.filteredList\" at-config=\"categoriesCtrl.config\">"+
    "          <thead></thead>"+
    "          <tbody class=\"col-md-12\">"+
    "          <tr ng-repeat=\"item in categoriesCtrl.filteredList\">"+
    "            <td class=\"align-middle\" at-title=\"Nome\" at-initial-sorting=\"asc\" at-sortable at-attribute=\"title\">{{item.title}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Status\" at-sortable at-attribute=\"isActive\">{{item.isActive | status}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Data de criação\" at-sortable at-attribute=\"createdAt\">{{item.createdAt | amUtcOffset:'-0300' | amDateFormat:'DD/MM/YYYY'}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Ação\">"+
    "              <button ng-click=\"categoriesCtrl.edit(item._id,item.title)\" class=\"btn btn-info btn-smn\"><i class=\"material-icons\">mode_edit</i></button>"+
    "              <button ng-click=\"categoriesCtrl.active(item._id,item.title,item.isActive)\" class=\"btn btn-primary btn-smn\">"+
    "                <i ng-if=\"item.isActive\" class=\"material-icons\">check_circle</i>"+
    "                <i ng-if=\"!item.isActive\" class=\"material-icons\">radio_button_unchecked</i>"+
    "              </button>"+
    "            </td>"+
    "          </tr>"+
    "          </tbody>"+
    "        </table>"+
    ""+
    "        <table ng-if=\"categoriesCtrl.showTable == false\" class=\"table table-striped table-responsive\">"+
    "          <thead>"+
    "            <tr>"+
    "              <th>Nome <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Status <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Data de criação <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Ação </th>"+
    "            </tr>"+
    "          </thead>"+
    "          <tbody>"+
    "            <tr>"+
    "              <td colspan=\"5\" class=\"text-center\"><i class=\"fa fa-circle-o-notch fa-spin\" style=\"font-size:24px; margin-right: 10px;\"></i> <span style=\"vertical-align: 25%;\">Aguarde um instante..</span></td>"+
    "            </tr>"+
    "          </tbody>"+
    "        </table>"+
    ""+
    "        <div ng-if=\"categoriesCtrl.showTable == true\" class=\"row controler-table\">"+
    "          <div class=\"col-md-3\">"+
    "            <div class=\"form-group\">"+
    "              <label>Ver </label>"+
    "              <select class=\"pagination-table custom-select\" ng-init=\"categoriesCtrl.config.itemsPerPage = '10'\" ng-model=\"categoriesCtrl.config.itemsPerPage\" class=\"form-control\">"+
    "                <option value=\"5\">5</option>"+
    "                <option value=\"10\">10</option>"+
    "                <option value=\"20\">20</option>"+
    "                <option value=\"50\">50</option>"+
    "              </select>"+
    "              <label>itens</label>"+
    "            </div>"+
    "          </div>"+
    "          <div ng-if=\"categoriesCtrl.showTable == true\" class=\"col-md-6\">"+
    "            <at-pagination at-list=\"categoriesCtrl.filteredList\" at-config=\"categoriesCtrl.config\" class=\"pag-table\" at-translate></at-pagination>"+
    "          </div>"+
    "        </div>"+
    ""+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);