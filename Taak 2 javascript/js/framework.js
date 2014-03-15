var IMDElement = function (element) {
            this.element=element;
            this.isArray=(element.length > 0) ? true : false;
        }

        IMDElement.prototype.addClass = function(p_class) {
            if(this.isArray){
                //loop door array
                for(var i=0, l=this.element.length; i<l; i++) {
                    var att = this.element[i].getAttribute("class");
                    this.element[i].setAttribute("class", att + " " +p_class);
                }
            } else { //Single element
                var att = this.element.getAttribute("class");
                this.element.setAttribute("class", att + " " +p_class);
            }
            return this;
        }

        IMDElement.prototype.value= function(){
            return this.element.value;
        }

        IMDElement.prototype.click = function(p_event) {
            if(this.isArray) {
               for(var i=0, l=this.element.length; i<l; i++) {
                    this.element[i].removeEventListener();
                    this.element[i].addEventListener("click", p_event);
               }
            } else {
                    this.element.removeEventListener();
                   this.element.addEventListener("click", p_event);
            }
            return this;
        }

        IMDElement.prototype.addTodo = function (p_todo, p_priority) {
            var listitem = document.createElement("li");
            listitem.innerHTML=p_todo;
            listitem.setAttribute("class","priority-"+p_priority);
            this.element[0].appendChild(listitem);
            return new IMDElement(listitem);
        }
