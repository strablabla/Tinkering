import json
import numpy as np
import io

class Three_json(object):
    '''
    Zoom 3D 
    '''
    def __init__(self):
        self.blabla = True
        self.N = 500
        self.ampl = 100

    def plot_shape_3d(self):
        '''
        Makes the 3D plot from the meshgrid.
        Makes the json that is read by FTICR2D_3d.html
        '''
        data = []
        Z = np.empty((self.N, self.N))
        for i in range(self.N):
            for j in range(self.N):
                Z[i,j] = self.ampl*(np.sin(i*np.pi/float(self.N)*4)+np.sin(j*np.pi/float(self.N)*4))
        print Z.shape
        dimx, dimy = Z.shape[0], Z.shape[1]
        xflat = np.array([np.arange(dimx) for i in range(dimy)]).flatten()
        yflat = np.array([np.ones(dimx)*i for i in range(dimy)]).flatten()
        zflat = Z.flatten()
        sizemat = xflat.size
        with io.open('3d.json', 'w', encoding ='utf-8') as f:
              for i in range(sizemat):
                  print(xflat[i])
                  data.append({'x':int(xflat[i]),'y':int(yflat[i]),'z': zflat[i] })
              f.write(unicode('data = '))
              f.write(unicode(json.dumps(data, ensure_ascii = False)))
              
tj = Three_json()
tj.plot_shape_3d()