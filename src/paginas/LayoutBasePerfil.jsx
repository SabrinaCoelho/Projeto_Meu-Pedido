import styled from '@emotion/styled'
import { Outlet } from "react-router-dom";

const SideMenu = styled.div`
    height: 100%;
    width: 200px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    padding-top: 20px;

`
const SideMenuItem = styled.a`
    padding: 6px 6px 6px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;

    &:hover{
        color: #f1f1f1;
    }
`
const Conteudo = styled.div`
    margin-left: 200px;
`
export const LayoutBasePerfil = () => {
    let teste = ["About", "services"]
    return(
        <>
            <SideMenu>
                {
                    teste.map(e => (<SideMenuItem>{e}</SideMenuItem>))
                }
            </SideMenu>
            <Conteudo>
                <Outlet/>
            </Conteudo>
        </>
    )
}