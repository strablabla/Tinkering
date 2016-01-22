import json
import numpy as np
import io

class Three_json(object):
    '''
    Zoom 3D 
    '''
    def __init__(self, ampl=None):
        self.ampl = ampl
        self.Nx = 300
        self.Ny = 300
    
    def example(self):
        self.ampl = 50
        Z = np.empty((self.Nx, self.Ny))
        for i in range(self.Nx):
            for j in range(self.Ny):
                Z[i,j] = (np.sin(i*np.pi/float(self.Nx)*4)+np.sin(j*np.pi/float(self.Ny)*4))
        print Z.shape
        return Z

    def plot_shape_3d(self, Z):
        '''
        Makes the 3D plot from the meshgrid.
        Makes the json that is read by FTICR2D_3d.html
        '''
        data = []

        dimx, dimy = Z.shape[0], Z.shape[1]
        xflat = np.array([np.arange(dimx) for i in range(dimy)]).flatten()
        yflat = np.array([np.ones(dimx)*i for i in range(dimy)]).flatten()
        zflat = self.ampl*Z.flatten()
        sizemat = xflat.size
        with io.open('3d.json', 'w', encoding ='utf-8') as f:
              for i in range(sizemat):
                  print(xflat[i])
                  data.append({'x':int(xflat[i]),'y':int(yflat[i]),'z': zflat[i] })
              f.write(unicode('data = '))
              f.write(unicode(json.dumps(data, ensure_ascii = False)))

if __name__=='__main__':
    tj = Three_json()
    tj.plot_shape_3d(tj.example())