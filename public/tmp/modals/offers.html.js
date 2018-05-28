angular.module("views/modals/offers.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/offers.html",
    "<div ng-click=\"offersModalCtrl.close()\" class=\"modal fade\">"+
    "  <div ng-click=\"$event.stopPropagation()\" class=\"modal-dialog\">"+
    "    <div class=\"modal-content\">"+
    "      <div class=\"modal-header\">"+
    "        <h4 class=\"modal-title\">{{offersModalCtrl.title}}</h4>"+
    "        <button type=\"button\" ng-click=\"offersModalCtrl.close()\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>"+
    "      </div>"+
    "      <div class=\"modal-body\">"+
    "       <div class=\"row\">"+
    "        <div class=\"col-md-12\">"+
    "         <ul class=\"nav nav-tabs nav-justified\">"+
    "          <li ng-class=\"{ active: offersModalCtrl.isSet(1) }\" class=\"nav-item\">"+
    "           <a ng-click=\"offersModalCtrl.setTab(1)\" class=\"nav-link\" href>Parceiro</a>"+
    "          </li>"+
    "          <li ng-class=\"{ active: offersModalCtrl.isSet(2) }\" class=\"nav-item\">"+
    "           <a ng-click=\"offersModalCtrl.setTab(2)\" class=\"nav-link\" href>Oferta</a>"+
    "          </li>"+
    "          <li ng-class=\"{ active: offersModalCtrl.isSet(3) }\" class=\"nav-item\">"+
    "           <a ng-click=\"offersModalCtrl.setTab(3)\" class=\"nav-link\" href>Descrições</a>"+
    "          </li>"+
    "          <li ng-class=\"{ active: offersModalCtrl.isSet(4) }\" class=\"nav-item\">"+
    "           <a ng-click=\"offersModalCtrl.setTab(4)\" class=\"nav-link\" href>Subcategorias</a>"+
    "          </li>"+
    "         </ul>"+
    "        </div>"+
    "       </div>"+
    "       <form ng-submit=\"offersModalCtrl.close(true)\" name=\"OffersFormModal\" novalidate>"+
    "        <div ng-show=\"offersModalCtrl.isSet(1)\">"+
    "          <div class=\"row account-col\">"+
    "           <div class=\"col-md-3\">"+
    "            <div class=\"form-group\">"+
    "             <p class=\"font-weight-bold\">Configurações pessoais</p>"+
    "             <p class=\"font-weight-normal\">Informações básicas do parceiro.</p>"+
    "            </div>"+
    "           </div>"+
    "           <div class=\"col-md-9\">"+
    "             <div class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">Nome</label>"+
    "              <div class=\"form-control\">{{offersModalCtrl.inputs.partner.name}}</div>"+
    "             </div>"+
    "             <div class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">Email</label>"+
    "              <div class=\"form-control\">{{offersModalCtrl.inputs.partner.email}}</div>"+
    "             </div>"+
    "             <div calss=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">Celular</label>"+
    "              <div class=\"form-control\">{{offersModalCtrl.inputs.partner.phoneNumber | phoneNumber}}</div>"+
    "             </div>"+
    "             <div ng-if=\"offersModalCtrl.inputs.partner.cpf\" class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">CPF</label>"+
    "              <div class=\"form-control\">{{offersModalCtrl.inputs.partner.cpf}}</div>"+
    "             </div>"+
    "             <div ng-if=\"offersModalCtrl.inputs.partner.cnpj\" class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">CNPJ</label>"+
    "              <div class=\"form-control\">{{offersModalCtrl.inputs.partner.cnpj}}</div>"+
    "             </div>"+
    "           </div>"+
    "          </div>"+
    "        </div>"+
    "        <div ng-show=\"offersModalCtrl.isSet(2)\">"+
    "          <div class=\"row account-col\">"+
    "           <div class=\"col-md-3\">"+
    "            <div class=\"form-group\">"+
    "             <p class=\"font-weight-bold\">Configurações da Oferta</p>"+
    "             <p class=\"font-weight-normal\">Nesta seção você pode avaliar a oferta cadastrada.</p>"+
    "            </div>"+
    "           </div>"+
    "           <div class=\"col-md-9\">"+
    "              <div class=\"form-group\">"+
    "                <label class=\"card-label\" for=\"formGroupExampleInput\">Título</label>"+
    "                <div class=\"form-control\">{{offersModalCtrl.inputs.title | commonNames}}</div>"+
    "              </div>"+
    "              <div class=\"form-group\">"+
    "                <label class=\"card-label\" for=\"formGroupExampleInput\">Galeria</label><br>"+
    "                <cloudinary-render url=\"offersModalCtrl.inputs.pictures\" data=\"array\"></cloudinary-render>"+
    "              </div>"+
    "              <div class=\"form-group\">"+
    "                <label class=\"card-label\" for=\"formGroupExampleInput\">Preço</label>"+
    "                <div class=\"form-control\">De {{offersModalCtrl.inputs.price.full | finance:true:2}} por {{offersModalCtrl.inputs.price.current | finance:true:2}}</div>"+
    "              </div>"+
    "              <div class=\"form-group\">"+
    "                <label class=\"card-label\" for=\"formGroupExampleInput\">Duração da Oferta</label>"+
    "                <div class=\"form-control\">Válida até {{offersModalCtrl.inputs.duration.expireDate | amUtcOffset:'-0300' | amDateFormat:'DD/MM/YYYY'}}</div>"+
    "              </div>"+
    "              <div ng-if=\"!offersModalCtrl.inputs.coupons.isLimited\" class=\"form-group\">"+
    "                <label class=\"card-label\" for=\"formGroupExampleInput\">Cupons Disponíveis</label>"+
    "                <div class=\"form-control\">{{offersModalCtrl.inputs.coupons.quantity}}</div>"+
    "              </div>"+
    "              <div ng-if=\"offersModalCtrl.inputs.coupons.isLimited\" class=\"form-group\">"+
    "                <label class=\"card-label\" for=\"formGroupExampleInput\">Cupons Disponíveis</label>"+
    "                <div class=\"form-control\">Ilimitado</div>"+
    "              </div>"+
    "           </div>"+
    "          </div>"+
    "        </div>"+
    "        <div ng-show=\"offersModalCtrl.isSet(3)\">"+
    "          <div class=\"row account-col\">"+
    "           <div class=\"col-md-3\">"+
    "            <div class=\"form-group\">"+
    "             <p class=\"font-weight-bold\">Configurações de Textos</p>"+
    "             <p class=\"font-weight-normal\">Nesta seção você pode avaliar as informações de textos.</p>"+
    "            </div>"+
    "           </div>"+
    "           <div class=\"col-md-9\">"+
    "             <div class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">Descrição do Produto</label>"+
    "              <div class=\"form-control\" ng-bind-html=\"offersModalCtrl.inputs.descriptions.main\"></div>"+
    "             </div>"+
    "             <div class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">Como usar o Produto</label>"+
    "              <div class=\"form-control\" ng-bind-html=\"offersModalCtrl.inputs.descriptions.howToUse\"></div>"+
    "             </div>"+
    "             <div class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">Onde usar o Produto</label>"+
    "              <div class=\"form-control\" ng-bind-html=\"offersModalCtrl.inputs.descriptions.whenToUse\"></div>"+
    "             </div>"+
    "             <div class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">Regras</label>"+
    "              <div class=\"form-control\" ng-bind-html=\"offersModalCtrl.inputs.descriptions.rules\"></div>"+
    "             </div>"+
    "             <div class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">Regras de Cobrança</label>"+
    "              <div class=\"form-control\" ng-bind-html=\"offersModalCtrl.inputs.descriptions.chargeRules\"></div>"+
    "             </div>"+
    "             <div class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">Bom Saber</label>"+
    "              <div class=\"form-control\" ng-bind-html=\"offersModalCtrl.inputs.descriptions.goodToKnow\"></div>"+
    "             </div>"+
    "           </div>"+
    "          </div>"+
    "        </div>"+
    "        <div ng-show=\"offersModalCtrl.isSet(4)\">"+
    "           <div class=\"row account-col\">"+
    "            <div class=\"col-md-3\">"+
    "             <div class=\"form-group\">"+
    "              <p class=\"font-weight-bold\">Lista de Subcategorias</p>"+
    "              <p class=\"font-weight-normal\">Nesta seção você pode verificar as subcategorias que está oferta irá aparecer.</p>"+
    "             </div>"+
    "            </div>"+
    "            <div class=\"col-md-9\">"+
    "              <div ng-repeat=\"subcategory in offersModalCtrl.inputs.subcategories\" class=\"form-group\">"+
    "                <div class=\"form-group\">"+
    "                 <label class=\"card-label\" for=\"formGroupExampleInput\">{{subcategory.category}}</label>"+
    "                 <div class=\"form-control\"><span class=\"font-weight-bold\">Subcategoria:</span> {{subcategory.title | commonNames}}</div>"+
    "                 <div class=\"form-control\"><span class=\"font-weight-bold\">Status:</span> {{subcategory.isActive | status}}</div>"+
    "                </div>"+
    "              </div>"+
    "            </div>"+
    "           </div>"+
    "        </div>"+
    "        <div class=\"modal-footer\">"+
    "         <button ng-if=\"offersModalCtrl.inputs.approval.status == 'reproved' ||offersModalCtrl.inputs.approval.status == 'pending' || offersModalCtrl.inputs.approval.status == 'reprov' || offersModalCtrl.inputs.approval.status == 'pend'\" type=\"button\" ng-click=\"offersModalCtrl.close(true)\" class=\"btn btn-success\" data-dismiss=\"modal\">"+
    "          <i class=\"material-icons\">thumb_up</i>"+
    "         </button>"+
    "         <button ng-if=\"offersModalCtrl.inputs.approval.status == 'pending' || offersModalCtrl.inputs.approval.status == 'pend'\" type=\"button\" ng-click=\"offersModalCtrl.close(false)\" class=\"btn btn-danger\" data-dismiss=\"modal\">"+
    "          <i class=\"material-icons\">thumb_down</i>"+
    "         </button>"+
    "         <button type=\"button\" ng-click=\"offersModalCtrl.close()\" class=\"btn btn-default\" data-dismiss=\"modal\"> Sair </button>"+
    "       </div>"+
    "       </form>"+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);