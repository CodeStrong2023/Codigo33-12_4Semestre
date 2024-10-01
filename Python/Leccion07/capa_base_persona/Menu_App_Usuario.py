from persona_dao import PersonaDAO
from Persona import Persona
from logger_base import log

class MenuAppUsuario:
    
    #Funcion para mostrar el menu
    @staticmethod
    def mostrarMenu():
        return f'''
            --------MENÚ--------
            1.Listar Usuarios
            2.Agregar Usuario
            3.Actualizar Usuario
            4.Eliminar Usuario
            5.Salir
        '''
        
    @staticmethod
    def elegir_opcion():
        while True:
            print(MenuAppUsuario.mostrarMenu())
            opcion = int(input("Por favor, ingrese su elección: (DEL 1 AL 5) "))
            if opcion == 1:
                MenuAppUsuario.lista()
            elif opcion == 2:
                MenuAppUsuario.inserta()
            elif opcion == 3:
                MenuAppUsuario.actualiza()
            elif opcion == 4:
                MenuAppUsuario.elimina()
            elif opcion == 5:
                print("¡Hasta luego!")
                break
            else:
                print("Opción inválida. Por favor, intente de nuevo.")
                
    #funcion para eliminar
    @staticmethod
    def elimina():
        id = int(input("Por favor, ingrese el ID del usuario que desea eliminar: "))
        persona1 = Persona(id)
        personas_eliminadas = PersonaDAO.eliminar(persona1)
        log.debug(f'Persona eliminada: {personas_eliminadas}')
        print("Usuario eliminado exitosamente.")

    #actualizar registro
    @staticmethod
    def actualiza():
        id = int(input("Por favor, ingrese el ID del usuario que desea actualizar: "))
        nombre = input("Por favor, ingrese el NOMBRE del usuario: ")
        apellido = input("Por favor, ingrese el APELLIDO del usuario: ")
        email = input("Por favor, ingrese el EMAIL del usuario: ")
        persona1 = Persona(id, nombre, apellido, email)
        personas_actualizadas = PersonaDAO.actualizar(persona1)
        log.debug(f'Personas actualizadas: {personas_actualizadas}')
        print("Usuario actualizado exitosamente.")
        
    #funcion insertar
    @staticmethod
    def inserta():
        nombre = input("Por favor, ingrese el NOMBRE del usuario: ")
        apellido = input("Por favor, ingrese el APELLIDO del usuario: ")
        email = input("Por favor, ingrese el EMAIL del usuario: ")
        persona1 = Persona(nombre=nombre, apellido=apellido, email=email)
        persona_insertada = PersonaDAO.insertar(persona1)
        log.debug(f'Persona insertada: {persona_insertada}')
        print("Usuario insertado exitosamente.")
      
    #Funcion seleccionar  
    @staticmethod
    def lista():
        personas = PersonaDAO.seleccionar()
        for persona in personas:
            log.debug(persona)
            print(persona)

MenuAppUsuario.elegir_opcion()