'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/cn'
import NextImage from 'next/image'
import React from 'react'

import type { Props as MediaProps } from '../types'

import { cssVariables } from '@/cssVariables'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const { breakpoints } = cssVariables

// A base64 encoded image to use as a placeholder while the image is loading
const placeholderBlurFallback =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAQK0lEQVR4AQEgEN/vAM3J4P/Nyd//zsrf/8/L3//Qzd7/0c7d/9LQ3f/U0tz/1dPb/9bV2//X1tr/2Nfa/9jX2f/Z19n/2NfZ/9jW2f/X1dn/19Ta/9bT2v/V0dr/1NDa/9PP2v/Sz9r/0s7a/9HO2v/Rztn/0c7Z/9HO2f/Rz9j/0c/Y/9HP2P/Rz9j/AM3J4P/Nyd//zcrf/87L3//PzN7/0c7d/9LQ3f/T0dz/1dPb/9bU2v/X1dr/19bZ/9jW2f/Y1tn/2NbZ/9fV2f/X1Nn/1tPZ/9XS2v/U0dr/09Da/9LP2v/Sztr/0c7a/9HN2v/Qzdn/0M3Z/9DO2f/Qztj/0M7Y/9DP2P/Qz9f/AMzI4P/MyOD/zcnf/83K3//Oy97/0M3d/9HP3f/S0Nz/09Lb/9TT2v/V1Nn/1tTZ/9bV2f/W1dj/1tTY/9XT2P/V0tn/1NHZ/9PQ2f/Sz9n/0c7Z/9DN2f/PzNn/z8zZ/87M2f/OzNn/zszY/87M2P/OzNj/zs3X/87N1//Ozdf/AMrH4P/LyOD/y8jf/8zJ3//Nyt7/zsvd/8/N3P/Qztv/0c/a/9LQ2f/S0dn/09LY/9PS2P/T0tf/0tHX/9LQ1//Rz9j/0M7Y/8/N2P/OzNj/zcvZ/83K2f/Mytn/y8nZ/8vJ2P/Lydj/ysnY/8rJ1//Kytf/ysrX/8vK1v/Lytb/AMnG4P/JxuD/ycfg/8rH3//KyN7/y8nd/8zK3P/Ny9v/zcza/87N2f/Oztj/zs7X/87O1v/Ozdb/zs3W/83M1v/My9b/y8rX/8rJ1//JyNf/yMfX/8fH2P/Hxtj/xsbX/8bF1//Gxdf/xcXX/8XG1v/Fxtb/xsbW/8bG1f/Gx9X/AMbF4P/GxeD/x8Xg/8fF3//Hxt7/yMfd/8jH2//JyNr/ycjZ/8nJ2P/Jydb/ycnW/8nJ1f/IyNX/yMjU/8fH1P/GxtX/xcXV/8TE1f/Dw9b/wsLW/8HC1v/Awdb/wMHW/7/B1v+/wdb/v8HV/7/B1f+/wdX/v8HU/7/C1P+/wtT/AMTD4f/Ew+D/xMPg/8TD3//Ew97/xMTc/8TE2//ExNn/xMTY/8TE1v/ExNX/w8PU/8LD0//BwtP/wMLS/7/B0v++wNP/vb/T/7y+0/+7vdT/ur3U/7m81f+5vNX/uLvV/7i71f+4u9T/uLvU/7i81P+4vNP/uLzT/7i80/+4vNL/AMDB4f/AweH/wMHg/8DB3//AwN7/wMDc/8DA2v+/v9n/vr/X/76+1f+9vtP/vL3S/7u80f+6u9H/uLvQ/7e60P+2udH/tLjR/7O30f+yt9L/sbbS/7C20/+wtdP/r7XT/6+10/+vtdP/r7XT/6+10v+vtdL/r7bR/6+20f+wttH/AL2/4f+9v+H/vb7g/72+3/+8vd7/u7zc/7u82v+6u9j/uLnW/7e41P+2t9L/tLbQ/7O1z/+xtM//r7PO/66yzv+ssc7/q7DP/6mwz/+or9D/p6/Q/6av0f+mr9H/pa7R/6Wu0f+lrtH/pa/R/6Wv0f+mr9D/pq/Q/6avz/+mr8//ALq84v+6vOH/ubzg/7m73/+4ut3/t7nb/7W32f+0tdf/srTU/7Cy0v+usND/rK/O/6qtzf+orMz/pqvM/6SqzP+iqcz/oKjM/5+ozf+dqM7/nKfO/5ynz/+bp8//m6fQ/5un0P+bp8//m6fP/5unz/+bp87/nKfO/5ynzv+cp83/ALe64v+2uuL/trnh/7W43/+0t93/srXb/7Cz2f+usNb/q67T/6ms0f+mqc7/o6fM/6Gly/+eo8r/m6LJ/5mhyf+XoMr/laDK/5Ogy/+SoMz/kaDM/5Cgzf+QoM7/j6DO/4+gzv+QoM7/kKDO/5Cgzf+QoM3/kaDM/5GgzP+RoMz/ALS44v+zuOL/s7fh/7G23/+wtN3/rbHb/6uu2P+oq9X/pajS/6Klz/+eos3/m6DL/5edyf+Um8j/kZrH/46Yx/+MmMf/iZfI/4iXyf+GmMr/hZjL/4SYy/+EmMz/hJnM/4SZzP+Emcz/hJnM/4WZzP+Fmcv/hpnL/4aZyv+GmMr/ALG34v+wtuL/r7Xh/66z3/+ssd3/qa7a/6ar1/+jp9T/n6PR/5ufzv+XnMv/k5jJ/4+Wx/+Lk8b/h5LF/4SQxf+BkMX/fo/G/3yQx/96kMj/eZHJ/3mRyv94ksr/eJLL/3mSy/95ksv/eZLL/3qSyv96ksr/e5LJ/3uSyf97ksn/AK614v+uteL/rbPh/6ux3/+prt3/pqva/6Kn1/+eo9P/mp/Q/5Wazf+Qlsr/jJLH/4ePxf+CjMT/forD/3qJw/92iMT/dIjE/3GJxf9wicb/borH/26LyP9ti8n/bozJ/26Myf9vjcn/b4zJ/3CMyf9wjMj/cYzI/3GMyP9yi8f/AKy04v+ss+L/q7Lh/6mw3/+mrd3/o6na/5+l1v+boNP/lpvP/5CWzP+Lkcn/ho3G/4CJxP97hsP/doTC/3KDwv9ugsL/a4LD/2iDxP9mhMX/ZYXG/2SGx/9kh8j/ZIfI/2WIyP9miMj/Z4jI/2eIyP9oh8f/aYfH/2mHx/9ph8b/AKuz4v+rsuL/qbHh/6ev3/+lq9z/oafZ/52j1v+YntL/k5jP/42Ty/+Hjsj/gYnF/3yFw/92gsH/cYDB/2x/wf9ofsH/ZH7C/2F/w/9fgMT/XoHF/16Cxv9eg8f/XoTH/1+EyP9ghcj/YIXI/2GEx/9ihMf/Y4TG/2OExv9kg8b/AKqy4v+qsuL/qbDh/6eu3/+kq9z/oKbZ/5yi1v+XndL/kZfO/4ySyv+GjMf/f4jE/3mEwv9zgMH/bn7A/2l8wP9kfMD/YXzB/159wv9cfsP/W3/E/1qAxf9bgcb/W4LH/1yDx/9dg8f/XoPH/1+Dx/9gg8b/YILG/2GCxv9hgsX/AKuy4v+qsuL/qbDh/6eu3/+kq9z/oKbZ/5yi1f+XndL/kpfO/4ySyv+Gjcf/gIjE/3qEwv90gMD/bn7A/2l9v/9lfMD/YnzB/199wv9dfsP/XH/E/1yBxf9cgsb/XIPH/12Dx/9ehMf/X4TH/2CEx/9hg8b/YoPG/2KDxf9jg8X/AKuz4v+rsuL/qrHg/6iu3v+lq9z/oafZ/52j1f+YntH/k5nO/46Tyv+Ijsf/gorE/3yGwv93g8D/coHA/21/v/9pf8D/Zn/B/2OAwv9igcP/YYLE/2CDxf9hhMb/YYXH/2KGx/9jhsf/ZIbH/2WGx/9mhsb/Z4bG/2eFxv9nhcX/AK204v+ss+H/q7Lg/6mw3v+nrdz/o6nZ/6Cl1f+boNH/lpvO/5GWyv+Mksf/h47E/4GKwv98h8H/eIXA/3SEwP9wg8D/bYPB/2uEwv9qhcP/aYbF/2mHxv9piMf/aYnH/2qJyP9risj/bIrI/22Kx/9uisf/borH/2+Kxv9vicb/AK+14f+utOH/rbPg/6yx3v+prtv/pqvY/6On1f+fo9L/m5/O/5aay/+Rlsj/jZPF/4iPw/+EjcL/gIvB/3yKwf95icH/d4nC/3WKw/90isT/c4vF/3OMxv9zjcf/c47I/3SPyP91j8j/dY/I/3aPyP93j8j/eI/H/3iPx/94j8f/ALG24f+xtuD/sLXf/6+z3v+ssdv/qq7Y/6eq1f+jp9L/oKPO/5yfy/+YnMj/lJnG/5CWxP+MlMP/iZLC/4aRwv+DkML/gZDD/4CRxP9+kcX/fpLG/36Tx/9+k8j/fpTJ/3+Vyf9/lcn/gJXJ/4GWyf+Blsn/gpbI/4KWyP+Dlsj/ALS44P+0uOD/s7ff/7K13f+ws9v/rrHY/6uu1f+pq9L/pajP/6KlzP+fosn/nJ/H/5idxf+Vm8T/kprD/5CZw/+OmMT/jJjE/4uYxf+KmMb/iZnH/4mayP+Jmsn/iZvK/4qbyv+LnMr/i5zK/4ycyv+Mncr/jZ3K/42dyf+Nncn/ALe64P+3ud//trne/7W43f+0ttv/srTY/7Cy1f+usNP/q63Q/6mrzf+mqcr/pKbI/6Gkx/+eo8X/nKLF/5qhxf+YoMX/l6DG/5agx/+VoMj/lKDJ/5Shyv+Uocv/laLL/5Wiy/+Vo8z/lqPM/5ejy/+XpMv/mKTL/5iky/+YpMr/ALq73/+6u9//ubve/7m63f+4udv/trjY/7W21v+ztNP/sbPQ/6+xzv+tr8v/q63J/6msyP+nq8f/pqnG/6Spxv+jqMf/oafI/6CnyP+gp8n/n6fK/5+oy/+fqMz/n6nM/5+pzf+gqc3/oKrN/6Gqzf+hq8z/oqvM/6KrzP+iq8z/AL293/+9vd7/vb3e/7y83P+8vNr/u7vY/7q61v+4udP/t7jR/7a2z/+0tcz/s7TL/7Gzyf+wssn/rrHI/62wyP+sr8n/q6/J/6quyv+prsv/qa7M/6muzf+pr83/qa/O/6mwzv+qsM7/qrDO/6qxzv+rsc7/q7LO/6uyzf+sss3/AMC/3v/Av97/wL/d/7+/3P+/vtr/v77Y/76+1v+9vdT/vbzS/7y80P+7u87/urrM/7m5y/+4uMr/trjK/7W3yv+0tsr/tLbL/7O1y/+ytcz/srXN/7K1zv+ytc//srXP/7K2z/+yts//s7bP/7O3z/+zt8//tLjP/7S4z/+0uM//AMPB3v/Cwd7/wsHd/8LB3P/Cwdr/wsHY/8LB1v/CwdT/wcHS/8HA0P/AwM//wMDN/7+/zP++vsv/vb7L/729y/+8vMz/u7zM/7q7zf+6u87/urrO/7m6z/+5utD/ubrQ/7m70P+6u9H/urzR/7q80P+7vdD/u73Q/7u+0P+8vtD/AMXC3f/Fwt3/xcLd/8XD3P/Fw9r/xcPY/8XE1//FxNX/xcTT/8XE0f/FxND/xcTO/8TEzf/Ew83/w8PM/8PCzf/Cwc3/wcHN/8HAzv/Av8//wL/Q/8C/0P/Av9H/wL/R/8C/0f/AwNL/wMDS/8HB0f/BwtH/wcLR/8LC0f/Cw9H/AMfD3f/Hw93/x8Tc/8fE2//Hxdr/yMXZ/8jG1//Ix9X/ycfT/8nI0v/JyND/ycjP/8nIzv/Ix87/yMfO/8jGzv/Hxc7/xsXP/8bEz//Fw9D/xcPR/8XD0f/FwtL/xcPS/8XD0v/Fw9L/xcTS/8bF0v/GxdL/xsbS/8bG0v/HxtL/AMjE3f/IxN3/yMXc/8nF2//Jxtr/ysfZ/8rI1//LydX/y8nU/8zK0v/MytH/zMvQ/8zKz//Mys//y8rO/8vJzv/LyM//ysfP/8rH0P/JxtH/ycbR/8nF0v/IxdL/yMXT/8jG0//JxtP/ycfT/8nH0//JyNP/ysjT/8rJ0//KydL/AMnF3f/Jxd3/ycXc/8nG2//Kx9r/y8jZ/8vJ1//MytX/zcvU/83L0v/NzNH/zszQ/87Mz//OzM//zcvP/83Lz//Nys//zMnQ/8zI0P/LyNH/y8fS/8vH0v/Lx9P/y8fT/8vH0//LyNP/y8jT/8vJ0//MydP/zMrT/8zL0//My9P/e0udswMGfPQAAAAASUVORK5CYII='

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    pictureClassName,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''
  let blurhash: string | undefined

  if (!src && resource && typeof resource === 'object') {
    const {
      alt: altFromResource,
      blurhash: blurhasFromResource,
      height: fullHeight,
      url,
      width: fullWidth,
    } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''
    blurhash = blurhasFromResource || undefined

    const cacheTag = resource.updatedAt

    src = getMediaUrl(url, cacheTag)
  }

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value as number}px) ${(value as number) * 2}w`)
        .join(', ')

  return (
    <picture className={cn(pictureClassName)}>
      <NextImage
        alt={alt || ''}
        className={cn(imgClassName)}
        fill={fill}
        height={!fill ? height : undefined}
        placeholder="blur"
        blurDataURL={blurhash ?? placeholderBlurFallback}
        priority={priority}
        quality={100}
        loading={loading}
        sizes={sizes}
        src={src}
        width={!fill ? width : undefined}
      />
    </picture>
  )
}
