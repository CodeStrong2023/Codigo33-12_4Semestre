from logger_base import log

class Persona:
    def __init__(self, id_persona=None, nombre=None, apellido=None, email=None):
        self._id_persona = id_persona
        self._nombre = nombre
        self._apellido = apellido
        self._email = email
        
    def __str__(self):
        return f'''
            Id Persona: {self._id_persona},
            Nombre:{self._nombre}
            Apellido:{self._apellido}
            email: {self._email}
        '''
        #Metodos setters and getters
    @property
    def id_Persona(self):
        return self._id_persona
    
    @id_Persona.setter
    def id_Persona(self, id_persona):
        self._id_persona = id_persona
    
    @property
    def nombre(self):
        return self._nombre
    
    @nombre.setter
    def nombre(self, nombre):
        self._nombre = nombre
        
    @property
    def apellido(self):
        return self._apellido
    
    @apellido.setter
    def apellido(self, apellido):
        self._apellido = apellido
        
    @property
    def email(self):
        return self._email
    
    @email.setter
    def email(self, email):
        self._email = email
        

if __name__ == "__main__":
    persona1=Persona(1, "Juan", "Perez", "jperez@gmail.com")
    log.debug(persona1)
    persona2=Persona(nombre="Julian", apellido="Lopez", email="jlopez@gmail.com")
    log.debug(persona2)
    persona1= Persona(id_persona=1)
    log.debug(persona1)
    