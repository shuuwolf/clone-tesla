import React from 'react'

import { CarModel } from '../ModelsContext'

import { Container } from './styles'


interface Props {
  model: CarModel,
  children: React.ReactNode;
}


const ModelOverlay: React.FC<Props> = ({model,  children }) => {

  return <Container>{children}</Container>
}

export default ModelOverlay
