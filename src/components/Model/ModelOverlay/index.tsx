import { useTransform } from 'framer-motion';
import React, { useCallback, useLayoutEffect, useState } from 'react'

import { CarModel } from '../ModelsContext'
import useWrapperScroll from '../UseWrapperScroll';

import { Container } from './styles'


interface Props {
  model: CarModel,
  children: React.ReactNode;
}

type SectionDimensions = Pick<HTMLDivElement, 'offsetHeight' | 'offsetTop'>


const ModelOverlay: React.FC<Props> = ({model,  children }) => {
  const { scrollY } = useWrapperScroll()

  const getSectionDimensions = useCallback(
    () => {
      return {
        offsetTop: model.sectionRef.current?.offsetTop,
        offsetHeight: model.sectionRef.current?.offsetHeight
      } as SectionDimensions
    }, [model.sectionRef])
  

  const [dimensions, setDimensions] = useState<SectionDimensions>(
    getSectionDimensions()
  )

  useLayoutEffect(() => {
    function onResize() {
      window.requestAnimationFrame(() => setDimensions(getSectionDimensions()))
    }

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  const sectionScrollProgress = useTransform(scrollY, y => (y - dimensions.offsetTop) / dimensions.offsetHeight)

  const opacity = useTransform(sectionScrollProgress, [-0.42, -0.05, 0.05, 0.42], [0, 1 , 1 , 0])

  const pointerEvents = useTransform(opacity, value =>
      value > 0 ? 'auto' : 'none'
    )

  return <Container style={{ opacity , pointerEvents }}>{children}</Container>
}

export default ModelOverlay
