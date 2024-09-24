from logger_base import log
from conexion import conexion

class CursorDelPool:
    def __init__(self):
        self._conexion = None
        self._cursor = None
        
    def __enter__(self):
        log.debug(f'Inicio del metodo with y __enter__ ')
        self._conexion=conexion.obtenerConexion()
        self._cursor=self._conexion.cursor()
        return self._cursor
    
    def __exit__(self, tipo, valor, detalle):
        log.debug(f'Inicio de metodo exit')
        if valor:
            self._conexion.rollback()
            log.debug(f'Ocurrio una excepcion : {valor}')
        else:
            self._conexion.commit()
            log.debug(f'Commit de la transaccion')
        self._cursor.close()
        conexion.LiberarConexion(self._conexion)
        
if __name__=="__main__":
    with CursorDelPool() as cursor:
        log.debug('Dentro del bloque with')
        cursor.execute('SELECT * FROM persona')
        log.debug(cursor.fetchall())