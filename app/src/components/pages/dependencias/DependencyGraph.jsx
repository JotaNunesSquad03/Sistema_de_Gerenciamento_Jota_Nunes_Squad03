// src/components/DependencyGraph.jsx
import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data/esnext';

const DependencyGraph = ({ nodes, edges, onNodeClick, focusedNodes, impactedPath }) => {
    const visJsRef = useRef(null);
    const networkRef = useRef(null);
    const nodesDataSetRef = useRef(new DataSet());
    const edgesDataSetRef = useRef(new DataSet());

    useEffect(() => {
        nodesDataSetRef.current.clear();
        nodesDataSetRef.current.add(nodes.map(n => ({...n, opacity: 1})));
        
        edgesDataSetRef.current.clear();
        edgesDataSetRef.current.add(edges.map((e, i) => ({...e, id: e.id || `${e.from}-${e.to}-${i}` })));
    }, [nodes, edges]);

    useEffect(() => {
        const data = { nodes: nodesDataSetRef.current, edges: edgesDataSetRef.current };
        const options = {
            layout: {
                hierarchical: { enabled: true, direction: 'UD', sortMethod: 'directed', levelSeparation: 150, nodeSpacing: 200 }
            },
            physics: { enabled: false },
            interaction: { hover: true },
            nodes: {
                shape: 'box', font: { color: 'white', size: 12 }, margin: 10,
                widthConstraint: { maximum: 150 }, borderWidth: 2, shadow: true
            },
            edges: {
                arrows: { to: { enabled: true, scaleFactor: 1.2 } },
                color: { color: '#666666', highlight: '#BC1F1B' },
                width: 2, smooth: { type: 'curvedCW', roundness: 0.2 }
            }
        };
        
        const network = new Network(visJsRef.current, data, options);
        networkRef.current = network;

        network.on('click', (params) => {
            if (params.nodes.length > 0) onNodeClick(params.nodes[0]);
            else onNodeClick(null);
        });

        network.on('hoverNode', (params) => {
            if (impactedPath) return;
            const allConnectedNodes = network.getConnectedNodes(params.node);
            allConnectedNodes.push(params.node);
            const allNodes = nodesDataSetRef.current.getIds();
            const nodesUpdate = allNodes.map((nodeId) => ({
                id: nodeId,
                color: allConnectedNodes.includes(nodeId) ? undefined : { background: 'rgba(200,200,200,0.5)', border: 'rgba(200,200,200,0.5)' },
                font: { color: allConnectedNodes.includes(nodeId) ? 'white' : 'rgba(200,200,200,0.5)' }
            }));
            nodesDataSetRef.current.update(nodesUpdate);
        });

        network.on('blurNode', () => {
            if (impactedPath) return;
            const allNodes = nodesDataSetRef.current.getIds();
            const nodesUpdate = allNodes.map((nodeId) => ({
                id: nodeId,
                color: undefined, 
                font: { color: 'white' }
            }));
            nodesDataSetRef.current.update(nodesUpdate);
        });

        return () => {
            if (networkRef.current) {
                networkRef.current.destroy();
                networkRef.current = null;
            }
        };
    }, [onNodeClick, impactedPath]);

    useEffect(() => {
        const network = networkRef.current;
        const nodesDataSet = nodesDataSetRef.current;
        if (!network || !nodesDataSet || impactedPath) return;

        if (focusedNodes && focusedNodes.length > 0) {
            const allNodeIds = nodesDataSet.getIds();
            const updates = allNodeIds.map(id => ({ id, opacity: focusedNodes.includes(id) ? 1 : 0.3 }));
            nodesDataSet.update(updates);
            network.focus(focusedNodes[0], { scale: 1.5, animation: true });
        } else {
            // LÓGICA DE RESET DO FOCO
            const allNodeIds = nodesDataSet.getIds();
            const updates = allNodeIds.map(id => ({ id, opacity: 1 }));
            nodesDataSet.update(updates);
            
            // AQUI ESTÁ A LINHA DA CORREÇÃO
            network.unselectAll(); // Remove o destaque azul da seleção
        }
    }, [focusedNodes, impactedPath]);

    useEffect(() => {
        const network = networkRef.current;
        const nodesDataSet = nodesDataSetRef.current;
        const edgesDataSet = edgesDataSetRef.current;
        if (!network || !nodesDataSet || !edgesDataSet) return;

        const allNodeIds = nodesDataSet.getIds();
        const allEdgeIds = edgesDataSet.getIds();

        if (impactedPath) {
            const nodeUpdates = allNodeIds.map(id => ({ id, opacity: impactedPath.nodes.includes(id) ? 1 : 0.2 }));
            nodesDataSet.update(nodeUpdates);
            
            const edgeUpdates = allEdgeIds.map(id => ({
                id,
                color: impactedPath.edges.includes(id) ? '#BC1F1B' : undefined,
                width: impactedPath.edges.includes(id) ? 3 : undefined,
                opacity: impactedPath.edges.includes(id) ? 1 : 0.2,
            }));
            edgesDataSet.update(edgeUpdates);
        } else {
            const nodeUpdates = allNodeIds.map(id => ({ id, opacity: 1 }));
            nodesDataSet.update(nodeUpdates);
            const edgeUpdates = allEdgeIds.map(id => ({ id, color: undefined, width: undefined, opacity: 1 }));
            edgesDataSet.update(edgeUpdates);
        }
    }, [impactedPath]);

    return <div ref={visJsRef} id="dependencyGraph" />;
};

export default DependencyGraph;