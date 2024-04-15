const communities = require("../../Data/community")

type Community = {
    zipCode: string;
    communityName: string;
};

const getCommunitiesForDept = (dept: String) => {
    const comm: Array<String> = new Array<String>(0);
    communities.forEach((community: Community) => {
        if(community.zipCode == dept) comm.push(community.communityName)
    });

    return comm
}

export default getCommunitiesForDept;