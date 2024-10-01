import handlebars from 'handlebars'
import fs from 'fs'

interface ITemplateVariable {
  [key: string]: string | number
}

interface IParseMailTemplate {
  file: string,
  variables: ITemplateVariable
}

export default class handlebarsMailTemplate {
  public async parse({
    file,
    variables
  }: IParseMailTemplate): Promise<string> {
    // fs para ler o arquivo
    const templateFileContent = await fs.promises.readFile(file, {encoding: 'utf-8'})
    // faz o parser do conteúdo que está sendo enviado por parametro
    const parseTemplate = handlebars.compile(templateFileContent)

    return parseTemplate(variables)
  }
}
