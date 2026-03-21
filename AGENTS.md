# Steps to follow

## primary 
1. use /research/kerala_politics_masterplan.docx reference strictly  
2. we are creating frontend only, phase 1  
3. Ask questions back, never guess

## overrides
only override against masterplan, is in frontend creation, cretae spotlight itself, create exact copy of the given reference as reference

## Design structure
1. The images given inside circle -avatars, should have two background color, one red other blue, indicating the politician used in avatars political side
2. Make sure to use exact colors given in the reference image(/frontend/src/ref_ui001)
3. Use the image (frontend/src/politician001)

## reference and resources
1. overall reference - frontend/src/ref_ui001
2. Politician photo to use as demo - frontend/src/politician001

## Tech Stack
1. React js
2. tailwind 
3. use oops style if required (upto agent to decide)

## Fetch file from
Using MCP Tool
"lZTRdbvw8nGG2o8QQoQEzO"
and extract following nodes

## Figma Nodes
1. Main home page basic structure: node 42-178
2. Threads page final structure: node 59-199
3. Breaking-news : 52-102
4. Topics basic container : 52-103 

## From the Figma data, extract EVERY design token exactly:
1. All padding, margin, gap values in px
2. All font-family, font-size, font-weight, line-height, letter-spacing
3. All colors as hex
4. All border-radius, border width, border color
5. All width, height, min-width, max-width
6. All flex/grid layout properties
7. All box-shadow values

## Contingency
1. A for layout — mathematically convert x/y differences into padding/margin. Do not use absolute positioning.

## Most important rule
1. For tech stack — create a standard React/Tailwind project with proper component files, not CDN. Follow the agents.md tech stack exactly.
2. Make sure its scalable, modular, so should first create base containers, required components, and then assemble them to create the final UI. 